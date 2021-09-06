import Stripe from 'stripe';
const stripe = new Stripe('sk_live_8m7VdM5hThNGqpZBrVjHUThX006PWZ1YAT',  {
  apiVersion: '2020-08-27',
})

const generateResponse = (intent) => {
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    };
  } else if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    }
  }
};

export default async (req, res) =>  {
  const {id, amount} = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      description: 'MaxAndLea Card',
      payment_method: id,
      confirm: true,
      confirmation_method: 'manual',
    })
    console.log(payment)
    return res.status(200).json({
      confirm: 'abc123',
      id: payment.client_secret,
      url: payment?.next_action?.use_stripe_sdk?.stripe_js
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: error.message
    })
  }
}
