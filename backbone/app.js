
/**
 * Module dependencies.
 */

var express = require('express');
var guest = require('./routes/guest');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/start-the-party',function(req,res){
	var uid = req.params.uid,
    path = req.params[0] ? req.params[0] : 'index.html';
    res.sendfile(path, {root: './public'});
});

app.get('/guests', guest.list);
app.post('/guests', guest.addGuest);
app.put('/guests/:id',guest.updateGuest);
app.delete('/guests/:id',guest.removeGuest);

app.get('/party', guest.listPartyAnimals);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Animal Party server listening on port ' + app.get('port'));
});
