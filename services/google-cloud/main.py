#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging
logger = logging.getLogger()
logger.setLevel(logging.WARNING)

import os, json
from urllib.parse import quote
from time import time as now

import flask

import requests
logging.getLogger('requests').setLevel(logging.INFO)
import markdown2

from entity import KnowledgeGraph
from essay import Essay, mw_to_html5, md_to_html5, add_vue_app
from fingerprints import get_fingerprints

from gc_cache import Cache
cache = Cache()

VE_JS_LIB = 'https://jstor-labs.github.io/visual-essays/lib/visual-essays-0.3.21.min.js'

DEFAULT_MW_SITE = 'https://kg.jstor.org'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(BASE_DIR)), 'docs')

cors_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': True
}

def _set_logging_level(args):
    if 'log' in args:
        level = args.pop('log').lower()
        if level == 'debug':
            logger.setLevel(logging.DEBUG)
        elif level == 'info':
            logger.setLevel(logging.INFO)

def html5(request, **args):
    path = request.path[1:-1] if request.path.endswith('/') else request.path[1:]
    path = '/'.join(path.split('/')[1:])
    logger.info(f'{path} {args}')

    mwTitle = None
    src = None

    if 'title' in args:
        mwTitle = args.pop('title')
    elif 'src' in args:
        if DEFAULT_MW_SITE in args['src']:
            mwTitle = '/'.join(args.pop('src').split('/')[4:])
        else:
            src = args.pop('src')
    elif 'gdid' in args:
        src = 'https://drive.google.com/uc?export=download&id=%s' % args.pop('gdid')
    else:
        mwTitle = path

    if mwTitle:
        site = args.pop('site', DEFAULT_MW_SITE)
        url = f'{site}/w/api.php?action=parse&format=json&page={quote(mwTitle)}'
        resp = requests.get(url, headers={'Accept': 'application/json'}).json()
        raw_html = f'<!doctype html><html lang="en">\n<head>\n<meta charset="utf-8">\n<title>{mwTitle}</title>\n</head>\n<body>\n' + resp.pop('parse')['text']['*'] + '\n</body>\n</html>'
        return mw_to_html5(raw_html)
    else: # fmt is markdown and src contains URL to file
        if src.startswith('file://localhost'):
            path = os.path.join(CONTENT_DIR, src[17:].split('?')[0])
            with open(path, 'r') as fp:
                md = fp.read()
        else:
            md = requests.get(src).content.decode('utf-8')
        raw_html = markdown2.markdown(md, extras=['footnotes', 'fenced-code-blocks'])
        fname = src.split('?')[0].split('/')[-1].split('.')[0]
        return md_to_html5(raw_html, fname)

def to_html5(*args, **kwargs):
    global request
    if args and 'request' not in globals():
        request = args[0]
    if request.method == 'OPTIONS':
        return ('', 204, cors_headers)
    else:
        args = dict([(k, request.args.get(k)) for k in request.args])
        _set_logging_level(args)
        html = html5(request, **args)
        return (html, 200, cors_headers)

def local_content(*args, **kwargs):
    global request
    if args and 'request' not in globals():
        request = args[0]
    content_path = os.path.join(CONTENT_DIR, request.view_args['fname'])
    logger.info(f'local_content: {content_path}')
    if os.path.exists(content_path) and content_path.split('/')[-1] not in ('favicon.ico',):
        with open(content_path, 'r') as fp:
            md = fp.read()
            return (md, 200, {'Content-type': 'text/markdown; charset=utf-8'})
    else:
        return ('Not found', 404)

def essay(*args, **kwargs):
    global request, cache
    if args and 'request' not in globals():
        request = args[0]
    if request.method == 'OPTIONS':
        return ('', 204, cors_headers)
    else:
        args = dict([(k, request.args.get(k)) for k in request.args])
        _set_logging_level(args)
        nocss = args.pop('nocss', 'false').lower() in ('true', '') if 'nocss' in args else False
        
        st = now()
        html = html5(request, **args)
        logger.info(f'{round(now()-st, 3)}: html5')
        
        st = now()
        essay = Essay(html=html, cache=cache, **args)
        logger.info(f'{round(now()-st, 3)}: essay')

        if not nocss:
            with open('main.css', 'r') as styles:
                essay.add_stylesheet(style=styles.read())
        
        html = essay.html
        html = add_vue_app(html, VE_JS_LIB)

        return (html, 200, cors_headers)

def entity(*args, **kwargs):
    global request
    if args and 'request' not in globals():
        request = args[0]
    if request.method == 'OPTIONS':
        return ('', 204, cors_headers)
    else:
        args = dict([(k, request.args.get(k)) for k in request.args])
        _set_logging_level(args)
        path = request.path[7:] if request.path.startswith('/entity') else request.path
        qid = path[1:-1] if path.endswith('/') else path[1:]
        logger.info(f'entity: path={path} args={args}')
        entity = KnowledgeGraph(cache=cache, **args).entity(qid, **args)
        # accept = request.headers.get('Accept', 'application/json').split(',')
        # content_type = ([ct for ct in accept if ct in ('text/html', 'application/json', 'text/csv', 'text/tsv')] + ['application/json'])[0]
        # as_json = args.pop('format', None) == 'json' or content_type == 'application/json'
        return (entity, 200, cors_headers)

def fingerprints(*args, **kwargs):
    global request
    if args and 'request' not in globals():
        request = args[0]
    if request.method == 'OPTIONS':
        return ('', 204, cors_headers)
    else:
        args = dict([(k, request.args.get(k)) for k in request.args])
        _set_logging_level(args)
        logger.info(f'fingerprints: args={args}')
        if 'qids' in args:
            qids = set()
            for qid in args['qids'].split(','):
                # ensure qids are namespaced
                ns, qid = qid.split(':') if ':' in qid else ('wd', qid)
                qids.add(f'{ns.strip()}:{qid.strip()}')
        fingerprints = get_fingerprints(qids, args.get('language', 'en'))
        logger.info(fingerprints)
        return (fingerprints, 200, cors_headers)

if __name__ == '__main__':
    logger.setLevel(logging.INFO)
    from flask_cors import CORS
    from flask import Flask, request
    #from sqlitedict_cache import Cache
    #cache = Cache()
    app = flask.Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False
    VE_JS_LIB = 'http://localhost:8080/lib/visual-essays.js'
    CORS(app)
    app.add_url_rule('/html5', 'html5', to_html5)
    app.add_url_rule('/entity/<qid>', 'entity', entity)
    app.add_url_rule('/essay', 'essay', essay)
    app.add_url_rule('/fingerprints', 'fingerprints', fingerprints)
    app.add_url_rule('/<fname>', 'local_content', local_content)
    app.run(debug=True, host='0.0.0.0')
