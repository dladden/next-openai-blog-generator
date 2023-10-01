import { getSession } from '@auth0/nextjs-auth0';
import stripeInit from 'stripe';

/**
 * MongoDB Connection done here:
 * addCRedits will check if the user has a profile store in db
 * if user does not create one and add some credits, if user exists
 * more tokens will be added upon their request. Auth0 provides "sub"
 * subject identifier in {user} which can be used to check unique users
 *
 * addCRedits is used for connection to mongodb todo upsert (insert + update)
 */
const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  //destructuring the user
  const { user } = await getSession(req, res);

  //lineItems is the session that takes on the products in this case only one
  const lineItems = [
    {
      price: process.env.STRIPE_CREDITS_PRICE_ID,
      quantity: 1,
    },
  ];
  //Specifying absolute url the protocol for the project http in production and https in prod
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  //determining the host from request headers
  const host = req.headers.host;

  //getting the stripe product & stripe checkout session here
  //Additionally passing user sub as metadata to know who makes the purchase
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${protocol}${host}/order-confirmation`,
    payment_intent_data: {
      metadata: {
        sub: user.sub,
      },
      metadata: {
        sub: user.sub,
      },
    },
  });

  console.log('user: ', user);

  //return data
  res.status(200).json({ session: checkoutSession });
}
