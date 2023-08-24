import { Layout } from "@/components/layout/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

export default function newPost(props) {
  console.log(props);
  //Saving the postContent into local state
  const [postContent, setPostContent] = useState("");
  //function which will query new api endpoint for the postGenerator
  const handleClick = async () => {
    //async which returns a promise
    const response = await fetch(`/api/postGenerator`, {
      method: "POST",
    });
    //Grabbing the response from the postGenerator.js
    const json = await response.json();
    console.log("Response: ", json.post.postContent);
    //setting the string
    setPostContent(json.post.postContent);
  };
  return (
    <div>
      <h1>TextFlow AI: New Post</h1>
      <button className="btn" onClick={handleClick}>
        Generate
      </button>
      <div
        className="max-w-screen-sm p-10"
        dangerouslySetInnerHTML={{ __html: postContent }}
      />
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
