var 
  fetch = require('node-fetch')
  , JSONStream = require('JSONStream')
  , Cache = require('streaming-cache')
  , eachOfSeries = require('async/eachOfSeries')
;

var cache = new Cache();

exports.data = function(webrequest, webresponse) {

  var url = webrequest.body.url;
  var query = webrequest.body.query;

  fetch(url).then(function(res){
    res.body.pipe(cache.set('cache'));

    res.body.on('end', function(){

        eachOfSeries(query, function(q, index, callback) {
          var jsonStream = JSONStream.parse(q);
          jsonStream.on('end', function(){
            callback();
          });
          cache.get('cache').pipe(jsonStream)
            .pipe(JSONStream.stringify(
              open = (index == 0 ? '{' : '') + 'table'+index+':[\n', 
              sep='\n,\n', 
              close= (index == query.length - 1 ? '\n]}\n' : '\n],\n')
            ))
            .pipe(webresponse, { end: index == query.length - 1 ? true : false });
        });

    });
    
  });


}