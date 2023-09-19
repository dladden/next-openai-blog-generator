import { getSession } from '@auth0/nextjs-auth0';
import clientPromise from '@/lib/mongodb';

/**
 * MongoDB Connection done here:
 * addCRedits will check if the user has a profile store in db
 * if user does not create one and add some credits, if user exists
 * more tokens will be added upon their request. Auth0 provides "sub"
 * subject identifier in {user} which can be used to check unique users
 *
 * addCRedits is used for connection to mongodb todo upsert (insert + update)
 */
export default async function handler(req, res) {
  //destructuring the user
  const { user } = await getSession(req, res);

  console.log('user: ', user);
  //connecting to mongodb
  const client = await clientPromise;
  const db = client.db('textFlow');
  //upsert - does both check and update user. Checking if
  //sub exists
  const userProfile = db.collection('users').updateOne(
    {
      auth0Id: user.sub, //filter or identifier
    },
    {
      //increment
      $inc: {
        availableCredits: 10, //if it does exist create increment the count by 10
      },
      $setOnInsert: {
        auth0Id: user.sub, //insert to the document the count
      },
    },
    {
      upsert: true,
    }
  );

  res.status(200).json({ name: 'John Doe' });
}
