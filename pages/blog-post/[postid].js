import { Layout } from '@/components/layout/Layout';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getAppProps } from '@/utils/getAppProps';
/*
This is a dynamic root file aka: "[name].js" which allows to have
any random string as a root for the blog post 
*/
export default function Post(props) {
  console.log(props);

  return (
    <div className="h-full">
      <div className="max-w-screen-sm mx-auto">
        <div className="text-sm font-bold mt-6 p-1">
          SEO Tittle & Meta Description:
        </div>
        <div className="p-4 my-2 border bg-neutral-200 rounded-md">
          <div className="text-blue-600 text-2xl font-bold">{props.title}</div>
          <div className="mt-2">{props.postDescription}</div>
        </div>
        <div className="text-sm font-bold mt-6 p-1">Keywords:</div>
        <div className="flex flex-wrap pt-2 gap-1">
          {props.keywords.split(',').map((keyword, i) => (
            <div className="p-2 rounded-full bg-neutral-400 text-white" key={i}>
              {keyword}
            </div>
          ))}
        </div>
        <div className="text-sm font-bold mt-6 p-1">Post:</div>
        <div dangerouslySetInnerHTML={{ __html: props.postContent || '' }} />
      </div>
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
    //importing props from the getAppProps
    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    //connecting to the database
    const db = client.db('textFlow');
    //Grabbing the post by id
    const user = await db.collection('users').findOne({
      auth0Id: userSession.user.sub,
    });
    //Queering the post by ObjectId which is based on timestamp
    //Dynamic route parameter passed from the URL. Represents the value extracted
    //from the URL for the postId. For example, if the URL is "/posts/123", ctx.params.postId will be "123".
    const post = await db.collection('posts').findOne({
      _id: new ObjectId(ctx.params.postId),
      //making sure post retrieved belongs to a specific user
      userId: user._id,
    });

    return {
      props: {
        id: ctx.params.postId,
        postContent: post.postContent,
        title: post.title,
        postDescription: post.postDescription,
        keywords: post.keywords,
        ...props,
      },
    };
  },
});
