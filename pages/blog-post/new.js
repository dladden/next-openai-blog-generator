import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

export default function newPost(props) {
  console.log(props);
  //local states for the topic and keywords
  const [topic, setTopic] = useState("");
  console.log(topic);
  const [keywords, setKeywords] = useState("");
  console.log(keywords);
  //Saving the postContent into local state
  const [postContent, setPostContent] = useState("");
  //function which will query new api endpoint for the postGenerator
  const handleSubmit = async (e) => {
    //preventing default posting to itself
    e.preventDefault();
    //async which sends a promise and passes data through req in postGenerator in JSON format
    const response = await fetch(`/api/postGenerator`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ topic, keywords }),
    });

    //Grabbing the response from the postGenerator.js
    const json = await response.json();
    console.log("Response: ", json);
    //setting the string
    setPostContent(json.post.postContent);
    console.log(postContent);
  };
  return (
    <div>
      {/* FORM SECTION */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Topic:</strong>
          </label>
          <textarea
            className=" resize-none border border-neutral-300 w-[30rem] my-2 px-10 py-2 rounded"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label>
            <strong>Keywords:</strong>
          </label>
          <textarea
            className=" resize-none border border-neutral-300 w-[30rem] my-2 px-4 py-2 rounded"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button type="submit" className="btn px-4 py-2">
          Generate
        </button>
      </form>
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
