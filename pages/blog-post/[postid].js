import { Layout } from "@/components/layout/Layout";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
/*
This is a dynamic root file aka: "[name].js" which allows to have
any random string as a root for the blog post
*/
export default function Post() {
  return (
    <div>
      <h1>Post Page</h1>
    </div>
  );
}
/*
The purpose of the getLayoutFunc is to wrap the page component 
with the Layout component and provide the pageProps to it. 
This allows you to define a consistent layout structure that surrounds 
the content of your page.
*/
Post.getLayoutFunc = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};
/**
 * getServerSideProps is ann async function which will set a function on
 * an object. ctx is a context of the function. We use it to connect to the
 * mongodb. we pass the req and res
 */
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    //connecting to the database
    const db = client.db("textFlow");
    //Grabbing the post by id
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    //Queering the post
    const post = await db.collection("post").findOne({});
  },
});
