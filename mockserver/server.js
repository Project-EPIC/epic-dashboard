var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors())


var newevent = require('./mocks/newevent.json');
var fetchEvents = require('./mocks/fetchevents.json');
var modifyevent = require('./mocks/modifyevent.json');
var annotateTweets = require('./mocks/annotatetweets.json');


app.post('/newevent', jsonParser,function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(newevent)
})

app.get('/fetchevents', function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(fetchEvents)
  })

app.put('/:normalized_name/:type', function (req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(modifyevent)
})

app.get('/tweets/:eventId', function (req, res, next) {
  let per_page = req.query.per_page;
  let page = req.query.page;
  console.log(`query params: per_page:: ${per_page} Page:: ${page}`)
  // let limit = req.query.limit;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json(annotateTweets)
})

app.post(`/annotate`, jsonParser,function(req, res, next) {
  let body = req.body;
  console.log(`body is: ${JSON.stringify(body)}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({'success': true})
});

app.get('/annotate', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(`in the server hander, ID: ${req.query.id}`)
  res.json({"tags":["initaltag1", "initaltag2", "initaltag3"]})
})


app.listen(9001, function () {
  console.log('CORS-enabled web server listening on port 9001')
})