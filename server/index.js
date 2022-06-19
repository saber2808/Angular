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

app.listen(5000, () =>{
    console.log("App is listening on port 5000")
})


