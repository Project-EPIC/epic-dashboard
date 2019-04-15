var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())


var newevent = require('./mocks/newevent.json');
var fetchEvents = require('./mocks/fetchevents.json');
var modifyevent = require('./mocks/modifyevent.json');
var annotateTweets = require('./mocks/annotatetweets.json');


app.post('/newevent', function (req, res, next) {
    res.json(newevent)
})

app.get('/fetchevents', function (req, res, next) {
      res.json(fetchEvents)
  })

app.put('/:normalized_name/:type', function (req, res, next) {    
    res.json(modifyevent)
})

app.get('/tweets/:eventId', function (req, res, next) {
  let page = req.query.page;
  // let limit = req.query.limit;
  res.json(annotateTweets)
})


app.listen(9001, function () {
  console.log('CORS-enabled web server listening on port 9001')
})