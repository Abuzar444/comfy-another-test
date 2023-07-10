// domain/.netlify/functions/create-payment-intent
require('dotenv').config()

const stripe = require('stripe')('sk_test_51MjygHLX1AGuIT55yDhjtfwqlY4V3jKmwVhSFHk9q2cLDUDYfGGJBN2TdbTc9VyArI5IBDXFf5bkWpPMgCmANurp00PExQ18YN')

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount
    }
    console.log('hi')

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  }

  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  }
}
