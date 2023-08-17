import { Layout } from "@/components/layout/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function newPost(props) {
  console.log(props);
  return (
    <div>
      <h1>TextFlow AI: New Post</h1>
    </div>
  );
}

/*
The purpose of the getLayoutFunc is to wrap the page component 
with the Layout component and provide the pageProps to it. 
This allows you to define a consistent layout structure that surrounds 
the content of your page.
*/
newPost.getLayoutFunc = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

//this special function runs server-side when requested
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
