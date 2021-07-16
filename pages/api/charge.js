import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51IjLvTHhHoTNAiE0EVFu8ue0eTtiCsVuZsY0Y3FGCsvtiIMkgAKLg5eertKQZMFrolIcUnVJnoxpUlqIEAOJkfKC00EtAYyMKt',  {
  apiVersion: '2020-08-27',
})

export default async (req, res) =>  {
  const {id, amount} = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      description: 'MaxAndLea Card',
      payment_method: id,
      confirm: true
    })
    console.log(payment)
    return res.status(200).json({
      confirm: 'abc123'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: error.message
    })
  }

}
