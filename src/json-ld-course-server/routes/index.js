'use strict';

const express = require('express');
const router = express.Router();

function getHost() {
  if ("undefined" === typeof process.env.LOCAL_NETWORK) {
    return encodeURIComponent('localhost:3211');
  } else {
    return encodeURIComponent(process.env.LOCAL_NETWORK);
  }

}

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
      title: 'Exercise 1: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa001'
    },
    {
      part: 2,
      title: 'Exercise 2: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa002'
    },
    {
      part: 3,
      title: 'Exercise 3: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa003&context=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa003.jsonld'
    },
    {
      part: 4,
      title: 'Exercise 4: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa004.json&context=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa004.jsonld'
    },
    {
      part: 5,
      title: 'Exercise 5: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa005.json&context=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa005.jsonld'
    },
    {
      part: 6,
      title: 'Exercise 6: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa006'
    },
    {
      part: 7,
      title: 'Exercise 7: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa007'
    },
    {
      part: 8,
      title: 'Exercise 8: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa008'
    },
    {
      part: 9,
      title: 'Exercise 9: Datatypes (fails)',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa009'
    },
    {
      part: 10,
      title: 'Exercise 10: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa010'
    },
    {
      part: 11,
      title: 'Exercise 11: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa011'

    }
  ],
  exercises: [
    {
      exercise: 1,
      title: 'Exercise 1: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe001'
    },
    {
      exercise: 2,
      title: 'Exercise 2: Tagging strings for language',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe002'
    },
    {
      exercise: 3,
      title: 'Exercise 2: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe003'
    },
    {
      exercise: 4,
      title: 'Exercise 4: More datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe004'
    },
    {
      exercise: 5,
      title: 'Exercise 5: Coercing things into arrays',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe005'
    },
    {
      exercise: 6,
      title: 'Exercise 6: Reversing semantics',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe006'
    },
    {
      exercise: 7,
      title: 'Exercise 7: Indexer-friendly syntax',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe007'
    },
    {
      exercise: 8,
      title: 'Exercise 8: Making things pretty',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe008'
    },
    {
      exercise: 9,
      title: 'Exercise 9: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe009'
    },
    {
      exercise: 10,
      title: 'Exercise 10: Yet more datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe010'
    },
    {
      exercise: 11,
      title: 'Exercise 11: Language maps',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe011'
    },
    {
      exercise: 12,
      title: 'Exercise 12: Framing',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe012'
    },
    {
      exercise: 13,
      title: 'Exercise 13: Embedding',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe013'
    },
    {
      exercise: 14,
      title: 'Exercise 14: More embedding',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe014'
    },
    {
      exercise: 15,
      title: 'Exercise 15: The whole shebang',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%3A3211%2Fexercises%2Fe015'
    }
  ]
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', initialData);
});

router.get('/:contextDirectory/:contextFile', function (req, res, next) {

  var json = '.json';
  var contextFile = req.params.contextFile;
  var contextDirectory = req.params.contextDirectory;

  var leaf = (contextDirectory !== 'context' && contextFile.substring(contextFile.length - json.length) !== json) ?
  contextFile + json : contextFile;

  var options = {
    root: __dirname + '/../public/',
    dotfiles: 'deny',
    'headers': {
      'Content-Type': 'application/ld+json; charset=utf-8'
    }
  }

  res.sendFile('files/' + contextDirectory + '/' + leaf, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Ipcress' + process.env.LOCAL_NETWORK)

      console.log('Sent:', leaf);
    }
  });
});

module.exports = router;
