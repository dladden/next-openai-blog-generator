import { Layout } from "@/components/layout/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function newPost(props) {
  console.log(props);
  //function which will query new api endpoint for the postGenerator
  const handleClick = async () => {
    //async which returns a promise
    const response = await fetch(`/api/postGenerator`, {
      method: "POST",
    });
    //Grabbing the response
    const json = await response.json();
    console.log("Response: ", json);
  };
  return (
    <div>
      <h1>TextFlow AI: New Post</h1>
      <button className="btn" onClick={handleClick}>
        Generate
      </button>
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
