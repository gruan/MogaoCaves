(function() {
  'use strict';
  var express = require('express');
  var app = express();
  var fs = require('fs');

  app.use(express.static('app'));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });

  var port = 8080;
  app.listen(port, function () {
    console.log('Listening on port %d', port);
  });
})();
