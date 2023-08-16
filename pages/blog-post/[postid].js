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
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
