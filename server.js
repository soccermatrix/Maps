var path = require('path');
var bodyParser = require('body-parser');
var liveServer = require("live-server");
var express = require('express');


var app = express();


//liveSever properties
var params = {
    port: 7000, // Set the server port. Defaults to 8080. 
    //host: "0.0.0.1", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. 
    root: "/public", // Set root directory that's being server. Defaults to cwd. 
    open: false, // When false, it won't load your browser by default. 
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore 
    //file: "index.htm", // When set, serve this file for every 404 (useful for single-page applications) 
    wait: 0, // Waits for all changes, before reloading. Defaults to 0 sec. 
    mount: [['/components', './node_modules']], // Mount a directory to a route. 
    logLevel: 0, // 0 = errors only, 1 = some, 2 = lots 
    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack 
};

liveServer.start(params);


//configure app

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//use middleware
//app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, '.')));

app.use(bodyParser.urlencoded( {extended: false}));

//define routes


app.listen(7000, '127.0.0.1', function() {
	console.log('ready on port 7000');
});