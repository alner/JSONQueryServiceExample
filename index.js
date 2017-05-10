var express = require('express');
var bodyParser = require('body-parser');
var sources = require('./source');

const PORT = process.env.PORT || 8000;
var app = express();
// parse application/json
app.use(bodyParser.json());
app.post('/data', sources.data);
app.listen(PORT, function(){
    console.log(`http://localhost:${PORT}`);
});
