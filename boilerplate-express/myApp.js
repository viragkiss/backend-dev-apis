let express = require('express');
let app = express();
require('dotenv').config(); // dotenv package loads environment variables from your .env file into process.env
let bodyParser = require('body-parser'); // body-parser package to parse POST requets

// Log at all requests
app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next(); // allow server to move to next function in stack
});

// console.log("Hello World!");
app.get("/", (req, res) => {
    // res.send("Hello Express")
    absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

// Serve static assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// Serve json according to environment variable
app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": "Hello json".toUpperCase()});
    } else {
        res.json({"message": "Hello json"});
    }
});

// chain middleware & add current time to request object
app.get('/now', function(req, res, next) {
    req.time += new Date().toString();
    next();
  }, function(req, res) {
    res.send({time : req.time});
  });

  // echo server using route parameters
  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json( {echo : word} );
  });

  // Get query parameter input from the client
  /*
  app.route("/name").get((req, res) => {
    var { first: firstName, last: lastName } = req.query;
    res.json( {name: `${firstName} ${lastName}`} );
  }).post((req, res) => {
    var { first: firstName, last: lastName } = req.query;
    res.json( {name: `${firstName} ${lastName}`} );
  });
  */

  // mount body-parser middleware + post handler at /name 
  app.use(bodyParser.urlencoded({extended: false}));
  app.post("/name", function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });


  




































 module.exports = app;
