'use strict';

var express = require('express');
var router = express.Router();

const initialData = {
  title: 'JSON-LD Course',
  introduction: 'This is a short course in JSON-LD',
  tools: [
    {
      part: 0,
      title: 'JSON-LD Playground (running locally)',
      resource: 'json-ld.org/playground/'
    }
  ],
  parts: [
    {
      part: 0,
      title: 'Adding context',
      resource: 'context/a001.jsonld'
    }
  ]
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', initialData);
});

router.get('/context/:contextFile', function (req, res, next) {

  var options = {
    root: __dirname + '/../public/',
    dotfiles: 'deny',
    'headers': {
      'Content-Type': 'application/ld+json'
    }
  }
  res.sendFile('files/context/' + req.params.contextFile, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', req.params.contextFile);
    }
  });
});

module.exports = router;
