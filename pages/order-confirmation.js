import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '@/components/layout';
import { getAppProps } from '@/utils/getAppProps';

export default function orderConfirmation() {
  return (
    <div>
      <h1>Thank You For The Purchase!</h1>
    </div>
  );
}

/*
The purpose of the getLayoutFunc is to wrap the page component 
with the Layout component and provide the pageProps to it. 
This allows you to define a consistent layout structure that surrounds 
the content of your page.
*/
orderConfirmation.getLayoutFunc = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

/**
 * this special function runs server-side when requested
 * Grabbing the AppProps that pass each users posts with context "ctx"
 */
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
