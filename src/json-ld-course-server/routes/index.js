'use strict';

var express = require('express');
var router = express.Router();

const initialData = {
  title: 'JSON-LD Course',
  introduction: 'This is a short course in JSON-LD',
  tools: [
    {
      part: 1,
      title: 'JSON-LD Playground (running locally)',
      resource: 'json-ld.org/playground/'
    }
  ],
  parts: [
    {
      part: 1,
      title: 'Exercise one: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa001'
    },
    {
      part: 2,
      title: 'Exercise two: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa002'
    },
    {
      part: 3,
      title: 'Exercise two: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa003&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa003.jsonld'
    },
    {
      part: 4,
      title: 'Exercise three: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa004.json&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa004.jsonld'
    },
    {
      part: 5,
      title: 'Exercise four: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa005.json&context=http%3A%2F%2Flocalhost%3A3211%2Fcontext%2Fa005.jsonld'
    },
    {
      part: 6,
      title: 'Exercise five: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa006'
    },
    {
      part: 7,
      title: 'Exercise six: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa007'
    },
    {
      part: 8,
      title: 'Exercise five: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa008'
    },
    {
      part: 9,
      title: 'Exercise five: Datatypes (fails)',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa009'
    },
    {
      part: 10,
      title: 'Exercise five: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2Flocalhost%3A3211%2Fdocument%2Fa010'
    }
  ]
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', initialData);
});

router.get('/:contextDirectory/:contextFile', function (req, res, next) {

  var json = '.json';
  var contextFile = req.params.contextFile;
  var contextDirectory = req.params.contextDirectory;

  var leaf = (contextDirectory === 'document' && contextFile.substring(contextFile.length - json.length) !== json) ?
  contextFile + json : contextFile;

  var options = {
    root: __dirname + '/../public/',
    dotfiles: 'deny',
    'headers': {
      'Content-Type': 'application/ld+json'
    }
  }

  res.sendFile('files/' + contextDirectory + '/' + leaf, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', leaf);
    }
  });
});

module.exports = router;
