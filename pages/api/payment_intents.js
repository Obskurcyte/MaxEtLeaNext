import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51IjLvTHhHoTNAiE0EVFu8ue0eTtiCsVuZsY0Y3FGCsvtiIMkgAKLg5eertKQZMFrolIcUnVJnoxpUlqIEAOJkfKC00EtAYyMKt',  {
  apiVersion: '2020-08-27',
})

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      console.log(req.body)
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur'
      });

      console.log(paymentIntent)

      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message})
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end('Method not allowed')
  }
}
