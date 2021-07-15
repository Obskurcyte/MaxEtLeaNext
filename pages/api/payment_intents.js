import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51IjLvTHhHoTNAiE0EVFu8ue0eTtiCsVuZsY0Y3FGCsvtiIMkgAKLg5eertKQZMFrolIcUnVJnoxpUlqIEAOJkfKC00EtAYyMKt',  {
  apiVersion: '2020-08-27',
})

export default async (req, res) => {

  if (req.method === "POST") {
    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur",
        payment_method_types: ['card', 'bancontact'],
        payment_method_options: {
          bancontact: {
            preferred_language: 'fr',
          },
        },
      });


      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      console.log(err)
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
