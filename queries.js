const url="mongodb+srv://Byters:AmmarY2020@cluster0.aicfa.mongodb.net/?retryWrites=true&w=majority"
var mongoClient = require('mongodb').MongoClient;
const axios = require('axios');
//const stripe = require('stripe')('sk_test_51L2vu2FhZzaRvloxWe1usDutRKmio1kpgOIkRMZA2501HbOBg2OdKd7XnuYesH8V1WUSf1Un3LeW9eVdU1a9xnnN00HDr5xCei');
const stripe = require('stripe')('sk_test_51L5RyCK9eeLnVWPgLnaE6mefnFamJMWZetDS8ECDi0gI7T3sgYgxVZoeyQgKwzFIyBjdsaQEtsllyAGqdwLiwHDC00zlZFgGgs');


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

const addOrder = async (request, response) => {
  const {orderID,prodId,qunt,price,prodName} = request.body
  totl = price * qunt;
  mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("OrderService");
      var data = { id: orderID , productId: prodId ,productName: prodName,status: 'CREATED' , quantity: qunt , total: totl };
      dbo.collection("orderInfo").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("Order Inserted Successfully!");
        db.close();
      });
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: prodName,
            },
            unit_amount: (price*100),
          },
          quantity: qunt,
        },]
      ,
      mode: 'payment',
      success_url: 'http://localhost:3000/success/'+orderID,
      cancel_url: 'http://localhost:3000/error/'+orderID,
    });
    console.log("Payment Link created successfully!");
    response.send(session.url);
}


// const cancelOrder =  (request, response) => {
//   const {orderId} = request.body;
 
// }


// const fulfilOrder =  (request, response) => {
//   const {orderId} = request.body;
 
//}


//success payment card ::: 4242 4242 4242 4242
//failed payment card ::: 1234 5679 0123 4567


// const create_chekout_session = async (request, response) => {
//   const {orderID,prodName,price,qunt} = request.body;
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: prodName,
//           },
//           unit_amount: (price*100),
//         },
//         quantity: qunt,
//       },]
//     ,
//     mode: 'payment',
//     success_url: 'http://localhost:3000/success/'+orderID,
//     cancel_url: 'http://localhost:3000/error/'+orderID,
//   });
//   console.log("Payment Done");
//   response.redirect(303, session.url);
//   console.log(session.url);
// }




module.exports = {
  getproducts,
  //create_chekout_session,
  addOrder,
  //cancelOrder,
  //fulfilOrder,

}

