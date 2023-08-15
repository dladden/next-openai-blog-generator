import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function newPost(props) {
  console.log(props);
  return (
    <div>
      <h1>TextFlow AI: New Post</h1>
    </div>
  );
}
//this special function runs server-side when requested
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
