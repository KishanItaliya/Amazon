const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const stripe = require('stripe')('sk_test_51HTlbuFm8AspTnLCSuWbSg2uQ9UIt43usg0qFg2aywLBP9PomXxbj9BBZUkLlWf8W66ZM2ZLhq8xMfUQ8n9xDxA100KR3vl0rq')
// const { makepayment } = require("./controllers/stripepayment")

// App config
const app = express()

// Middlewares
// app.use(cors({ Origin: true }))
// app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

// app.post("/stripepayment", makepayment)

// API routes
app.get('/', (request, response) => response.status(200).send("hello world"))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total
    // const { id, amount } = request.body
    const {name, email, email_id, address1, address2, city, state, country, zip, phone} = request.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency: "INR",
        description: name,
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
        shipping: {
            name: name,
            address: {
              line1: address1,
              line2: address2,
              postal_code: zip,
              city: city,
              state: state,
              country: country,
            },
        },

        return : stripe.customers.create({
            email: email_id,
            description: name,
            shipping: {
                name: name,
                address: {
                    line1: address1,
                    line2: address2,
                    postal_code: zip,
                    city: city,
                    state: state,
                    country: country,
                }
            }
        })
      })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/clone-a205d/us-central1/api