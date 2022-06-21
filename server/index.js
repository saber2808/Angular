const express = require('express')


const stripe = require('stripe')("sk_test_51L8xcgHalZvwhJhBRS73IEuDfGDiOYa6pdSffcKmGvF6ncV0ASpmnTRQAIA70xgKmIlDytHpmzLVj1Hr888ZyJ5200CH424hsW");

const bodyparser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyparser.urlencoded({
    extended:false
}))

app.use(express.json())
app.use(bodyparser.json())

app.use(cors())

app.post('/checkout', async (req, res)=>{
    console.log(req.body)

    try {
        token = req.body.token
        const customer = stripe.customers
        .create({
          email: email,
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
          return stripe.charges.create({
            amount: grandTotal,
            description: "detail",
            currency: "VND",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }
})

app.listen(8080, () =>{
    console.log("App is listening on port 8080")
})


// const { async } = require('@firebase/util');
// const express = require('express');
// const app = express();
// const path = require('path');
// const stripe = require('stripe')("sk_test_51L8xcgHalZvwhJhBRS73IEuDfGDiOYa6pdSffcKmGvF6ncV0ASpmnTRQAIA70xgKmIlDytHpmzLVj1Hr888ZyJ5200CH424hsW");

// const YOUR_DOMAIN = "http://localhost:5000";

// //static user
// app.use(express.static(path.join(__dirname, "views")));

// //middle ware
// app.use(express.json());

// //route
// app.post("/payment", async(req, res) =>{
//   const {product} = req.body;
//   const session = await stripe.checkout.session.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "VND",
//           product_data: {
//             name: product.name,
//             images: [product.image]
//           },
//           unit_amount: product.amount
//         },
//         quantity: product.quantity,
//       }
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}`/success.html,
//     cancel_url: `${YOUR_DOMAIN}`/cancel.html

//   })
//   res.json({id: session.id})
// })
// const port = process.env.PORT || 5000;
// app.listen(port, ()=>console.log(`Listening on port ${port}...`));