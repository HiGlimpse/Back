const express= require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const config = require('./config/config');
const subscription= require('./models/subscription');
const app= express();
const morgan= require('morgan');
const path = require('path');

mongoose.connect(config.mongoURI);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//CORS CONTROL
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.static(path.join(__dirname, 'front')));
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', path.join(__dirname, '/front/views'))
app.get('/',function(req,res){
  res.render('index');
})


app.post('/subscription',function(req,res){
    if (!req.body.email) {
      console.log(req.body);
    res.json({
      success: false,
      msg: 'No email on request'
    });
  } else {
    var newSubscrition = new subscription({
        email: req.body.email,
        first: req.body.first,
        last: req.body.last
    });
    // save the email
    newSubscrition.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'This email is already on our subscription list.'
        });
      }
      res.json({
        success: true,
        msg: 'Welcome, Thanks for your interest'
      });
    });
  }
});




const port=config.port;
app.listen(port);
