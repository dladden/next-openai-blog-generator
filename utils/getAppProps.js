import clientPromise from '@/lib/mongodb';
import { getSession } from '@auth0/nextjs-auth0';

/**
 * In for every page that renders <AppLayout> getAppProps returns server side props
 * It provides all the post for the signed in user then sends them to be displayed
 * in the sidebar
 */
export const getAppProps = async (ctx) => {
  //Grabbing users available tokens and posts.
  const userSession = await getSession(ctx.req, ctx.res);
  //connecting to mongodb and finding the user by sub
  const client = await clientPromise;
  const db = client.db('textFlow');
  const user = await db.collection('users').findOne({
    auth0Id: userSession.user.sub,
  });
  //if the user does not exist return this:
  if (!user) {
    return {
      availableCredits: 0,
      posts: [],
    };
  } //end if user does not exist
  //if user does exist find all the post
  const posts = await db
    .collection('posts')
    .find({
      userId: user._id,
    })
    .toArray();
  //returning new object for each post using selective destructuring
  return {
    availableCredits: user.availableCredits,
    posts: posts.map(({ created, _id, userId, ...rest }) => ({
      id: _id.toString(),
      created: created.toString(),
      ...rest,
    })),
  };
}; //end async
