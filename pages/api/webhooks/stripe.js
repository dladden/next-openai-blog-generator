import micro_cors from 'micro-cors';
import StripeInit from 'stripe';
/**
 * Stripe.js is used for webhooks (HTTP callbacks or notifications that occur when certain events or triggers)
 * Endpoints used to reach external entity "Stripe"
 */

const stripe = StripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const verifyStripe = async ({ req, stripe, endpointSecret }) => {
  async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  const event = stripe.webhooks.constructEvent(
    buf.toString(),
    sig,
    endpointSecret
  );

  return event;
};

//Allowing the methods which we will use
const cors = micro_cors({
  allowMethods: ['POST', 'HEAD'],
});
//This is Next.js feature which allows to specify setting for the exported configs (by default bodyParser is on)
export const config = {
  api: {
    bodyParser: false,
  },
};
//Handler for this endpoint which checks if the data posted comes from Stripe with in event handler
const handler = async (req, res) => {
  if (req.method === 'POST') {
    let event;
    try {
      event = verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
    } catch (error) {
      console.log('ERROR', error);
    }
    //listening for the successful payment event
    switch (event.type) {
      case 'payment_intent.succeeded': {
      }
    }
  }
};
