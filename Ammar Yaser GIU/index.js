require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const query  = require('./queries');
const req = require('express/lib/request');

const app = express();

app.use(express.json());

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
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


app.get('/products', query.getproducts);

// app.post('/checkout', query.create_chekout_session);

app.post('/addOrder', query.addOrder);

//app.post('/error:id', query.cancelOrder);

//app.post('/success:id', query.fulfilOrder);


app.listen(3000, () => {
  console.log(`App running on port 3000.`)
})