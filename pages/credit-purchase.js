import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Layout } from "@/components/layout";

export default function creditPurchase() {
  return (
    <div>
      <h1> Credit Purchase</h1>
    </div>
  );
}

/*
The purpose of the getLayoutFunc is to wrap the page component 
with the Layout component and provide the pageProps to it. 
This allows you to define a consistent layout structure that surrounds 
the content of your page.
*/
creditPurchase.getLayoutFunc = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

//this special function runs server-side when requested
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
