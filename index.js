require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const query  = require('./queries');
const req = require('express/lib/request');
const cors = require("cors");
const { MongoClient } = require('mongodb');
var mongoClient = require('mongodb').MongoClient;

//const client = new MongoClient(process.env.MONGO_CONNECTION);
//client.connect().then(()=> console.log("connected to db"));

const app = express();
app.use(cors());
//app.use(cors())
app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended:true,
//   })
// )

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

app.get("/products/:_id",query.getprodid);

app.get("/search/:productName",query.search);

app.listen(3000, () => {
  console.log(`App running on port 3000.`)
})