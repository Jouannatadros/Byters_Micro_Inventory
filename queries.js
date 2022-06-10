const { json } = require('express/lib/response');

const url="mongodb+srv://Byters:AmmarY2020@cluster0.aicfa.mongodb.net/?retryWrites=true&w=majority"
var mongoClient = require('mongodb').MongoClient;

const getproducts = (request, response) => {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Inventory");
    dbo.collection("Products").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log("Products Recived Successfully!");
      response.status(200).json(result)
      db.close();
    });
  });
}


const getprodid=  (request, response) => {
  
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Inventory");
    var i = request.params._id
    var x = dbo.collection("Products").find({"id":i}).toArray(function(err, result) {
      if (err) throw err;
      response.status(200).json(result)
      db.close();
    });
  });
}

const search=  (request, response) => {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Inventory");
    var i = request.params.productName
    var x = dbo.collection("Products").find({"productName":i}).toArray(function(err, result) {
      if (err) throw err;
      response.status(200).json(result)
      db.close();
    });
  });
}

module.exports = {
  getprodid,
  getproducts,
  search
}

