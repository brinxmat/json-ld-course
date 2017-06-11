'use strict';

const fs = require('fs');
const path = require('path');
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
      title: 'Example 1: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa001'
    },
    {
      part: 2,
      title: 'Example 2: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa002'
    },
    {
      part: 3,
      title: 'Example 3: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa003&context=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa003.jsonld'
    },
    {
      part: 4,
      title: 'Example 4: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa004.json&context=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa004.jsonld'
    },
    {
      part: 5,
      title: 'Example 5: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa005.json&context=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa005.jsonld'
    },
    {
      part: 6,
      title: 'Example 6: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa006'
    },
    {
      part: 7,
      title: 'Example 7: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa007'
    },
    {
      part: 8,
      title: 'Example 8: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa008'
    },
    {
      part: 9,
      title: 'Example 9: Datatypes (fails)',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa009'
    },
    {
      part: 10,
      title: 'Example 10: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa010'
    },
    {
      part: 11,
      title: 'Example 11: Languages',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa011'
    },
    {
      part: 12,
      title: 'Example 12: Languages',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa012'
    },
    {
      part: 13,
      title: 'Example 13: Languages',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa013'
    },
    {
      part: 14,
      title: 'Example 14 A: Embedding resources',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fperson%2Fp001'
    },
    {
      part: 15,
      title: 'Example 14 B: Embedding resources',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa014'
    },
    {
      part: 16,
      title: 'Example 15: Embedding resources',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa015'
    },
    {
      part: 17,
      title: 'Example 16: Embedding resources',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa016'
    },
    {
      part: 18,
      title: 'Example 17 A: Simple frame document (no frame)',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa017'
    },
    {
      part: 19,
      title: 'Example 17 B: Simple frame document (framed)',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa017&frame=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa017.jsonld'
    },
    {
      part: 20,
      title: 'Example 18 A: Default (no frame)',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa018'
    },
    {
      part: 21,
      title: 'Example 18 B: Default (framed)',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa018&frame=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa018.jsonld'
    },
    {
      part: 22,
      title: 'Example 19: Embedding in frames',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa019&frame=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa019.jsonld'
    },
    {
      part: 23,
      title: 'Example 20: embedding with @last',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa020&frame=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa020.jsonld'
    },
    {
      part: 24,
      title: 'Example 21: Embedding with @always',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fdocument%2Fa021&frame=http%3A%2F%2F' + getHost() + '%2Fcontext%2Fa021.jsonld'
    }
  ],
  exercises: [
    {
      exercise: 1,
      title: 'Exercise 1: Adding context',
      resource: 'json-ld.org/playground/#startTab=tab-expanded&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe001'
    },
    {
      exercise: 2,
      title: 'Exercise 2: Tagging strings for language',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe002'
    },
    {
      exercise: 3,
      title: 'Exercise 2: Datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe003'
    },
    {
      exercise: 4,
      title: 'Exercise 4: More datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe004'
    },
    {
      exercise: 5,
      title: 'Exercise 5: Coercing things into arrays',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe005'
    },
    {
      exercise: 6,
      title: 'Exercise 6: Reversing semantics',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe006'
    },
    {
      exercise: 7,
      title: 'Exercise 7: Indexer-friendly syntax',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe007'
    },
    {
      exercise: 8,
      title: 'Exercise 8: Making things pretty',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe008'
    },
    {
      exercise: 9,
      title: 'Exercise 9: Aliasing',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe009'
    },
    {
      exercise: 10,
      title: 'Exercise 10: Yet more datatypes',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe010'
    },
    {
      exercise: 11,
      title: 'Exercise 11: Language maps',
      resource: 'json-ld.org/playground/#startTab=tab-compacted&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe011'
    },
    {
      exercise: 12,
      title: 'Exercise 12: Framing',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe012'
    },
    {
      exercise: 13,
      title: 'Exercise 13: Embedding',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe013'
    },
    {
      exercise: 14,
      title: 'Exercise 14: More embedding',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe014'
    },
    {
      exercise: 15,
      title: 'Exercise 15: The whole shebang',
      resource: 'json-ld.org/playground/#startTab=tab-framed&json-ld=http%3A%2F%2F' + getHost() + '%2Fexercises%2Fe015'
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



  fs.readFile(path.join(__dirname, '..', 'public', 'files', contextDirectory, leaf), 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {
      const returnData = ("undefined" === typeof process.env.LOCAL_NETWORK) ? data : data.replace(/localhost:3211/g, process.env.LOCAL_NETWORK);
      res.set('Content-Type', 'application/ld+json; charset=utf-8');
      res.status(200).send(returnData);
    }
  });
});

module.exports = router;
