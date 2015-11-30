var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname+'/app/index.html');
});

//image decoding funciton
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

router.post('/saveImage',function(req, res){
  var imageBuffer = decodeBase64Image(req.body.file['$ngfDataUrl']);
  fs.writeFile('/Users/iTOUCH/newkru-dlit/app/images/classroom/'+req.body.name, imageBuffer.data , 'utf-8', function (err) {
    if (err) 
      throw err;
    res.end();
  });
});

module.exports = router;
