var express = require('express');
var moment = require('moment');
var app = express();

app.set('port', (process.env.PORT || 4000)); 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
  console.log("Someone landed on home page yo");
})

app.get('/:time', function(req, res){
  var time = req.params.time;
  var unixRegEx = /^(\-|\+)?([0-9]+)$/;
  var naturalRegEx = /(January|February|March|April|May|June|July|August|September|October|November|December) [0-9]*, [0-9]*$/i;
  if(unixRegEx.test(time) || (naturalRegEx.test(time) && moment(time,'MMMM DD, Y')._isValid)){
    var momentTime;
    if(unixRegEx.test(time)){
      momentTime = moment(time,'X');
    }
    else {
      momentTime = moment(time,'MMMM DD, Y');
    }
    res.send({
      unix: momentTime.format('X'),
      natural: momentTime.format('MMMM DD, Y')
    });
    console.log("Someone sent a valid timestamp");
    }
    else {
      res.send({
        unix: null,
        natural: null
      });
    console.log("Someone sent an invalid timestamp");      
    }
  });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});