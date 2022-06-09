const url="mongodb+srv://Byters:AmmarY2020@cluster0.aicfa.mongodb.net/?retryWrites=true&w=majority"
var mongoClient = require('mongodb').MongoClient;
//const axios = require('axios');
//const req = require('express/lib/request');
//const stripe = require('stripe')('sk_test_51L2vu2FhZzaRvloxWe1usDutRKmio1kpgOIkRMZA2501HbOBg2OdKd7XnuYesH8V1WUSf1Un3LeW9eVdU1a9xnnN00HDr5xCei');
//const stripe = require('stripe')('sk_test_51L5RyCK9eeLnVWPgLnaE6mefnFamJMWZetDS8ECDi0gI7T3sgYgxVZoeyQgKwzFIyBjdsaQEtsllyAGqdwLiwHDC00zlZFgGgs');


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
// const getdesc = (request,response) =>{
//  mongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Inventory");
//     var i=Number(request.params._id)
//      dbo.collection("Products").findOne({"_id":i})(function(err,result){//find({}).toArray(function(err, result) {
//       if (!db) res.status(500).send("No db connection");
//       console.log(i);
//       response.status(200).json(result)
//       db.close();
//      });  
//   });
// }
  
// const getdesc = (request,response) =>{
//    mongoClient.connect(url, function(err, db) {
//   const db2 = await mongoClient();
//   if (!db2) res.status(500).send("No db connection");
//   var i=Number(req.params.orderId)
//   const results = await db2.collection('Inventory').findOne({"_id":i}) ;
//   console.log(i)
//   console.log(results)
//   res.status(200).send(results);
//   db.close();
// });
//}



const getprodid=  (request, response) => {
  
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Inventory");
    var i=request.params._id
    dbo.collection("Products").find({"id":i}).toArray(function(err, result) {
      if (err) throw err;
      response.status(200).json(result)
      db.close();
    });
  });
}





module.exports = {
 // getproducts,

  //create_chekout_session,
  //addOrder,
  getprodid,
  getproducts
  //cancelOrder,
  //fulfilOrder,

}

