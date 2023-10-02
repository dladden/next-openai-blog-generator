import micro_cors from 'micro-cors';
import StripeInit from 'stripe';
import clientPromise from '@/lib/mongodb';
/**
 * Stripe.js handles Stripe webhook events, specifically those related to payment intents.
 *It is used for webhooks (HTTP callbacks or notifications that occur when certain events or triggers)
 * Endpoints used to reach external entity "Stripe"
 */

const verifyStripe = async ({ req, stripe, endpointSecret }) => {
  async function buffer(readable) {
    const chunks = [];
    //iterating over the chunks of data in the readable stream
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

const stripe = StripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//Handler for this endpoint which checks if the data posted comes from Stripe with in event handler
const handler = async (req, res) => {
  if (req.method === 'POST') {
    let event;
    try {
      event = await verifyStripe({
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
        if (typeof event.type !== 'undefined') {
          // The event.type property exists
          console.log('Event type:', event.type);

          // Now you can check its value, e.g., for a specific event type
          if (event.type === 'payment_intent.succeeded') {
            // Handle the 'payment_intent.succeeded' event
            console.log('Payment succeeded!');
          } else {
            // Handle other event types if needed
          }
        } else {
          // The event.type property does not exist
          console.log('Event type is undefined.');
        }
        console.log('Payment Intent Succeeded');
        //connecting to mongodb
        const client = await clientPromise;
        const db = client.db('textFlow');
        //pulling metadata from checkoutSession in addCredits.js
        const paymentIntent = event.data.object;
        const auth0Id = paymentIntent.metadata.sub;

        //UPSERT - does both check and update user. Checking if sub exists
        const userProfile = db.collection('users').updateOne(
          {
            auth0Id, //filter or identifier
          },
          {
            //increment
            $inc: {
              availableCredits: 10, //if it does exist create increment the count by 10
            },
            $setOnInsert: {
              auth0Id, //insert to the document the count
            },
          },
          {
            upsert: true,
          }
        );
        break; //exiting the switch
      }
      //Logging the unhandled event in the switch statement
      default:
        console.log('Unhandled Event: ', event.type);
    }
    res.status(200).json({ received: true });
  }
};

//Exporting the handler within the cors functions
export default cors(handler);
