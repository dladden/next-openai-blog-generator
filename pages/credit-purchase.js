import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '@/components/layout';
import { getAppProps } from '@/utils/getAppProps';

export default function creditPurchase() {
  //hitting the endpoint of currently signed in user
  const handleClick = async () => {
    const result = await fetch(`/api/addCredits`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('result: ', json);
    //directing to the stripe checkout url in the from fetched result
    window.location.href = json.session.url;
  };

  return (
    <div>
      <h1> Credit Purchase</h1>
      <button className="btn px-4 py-2" onClick={handleClick}>
        {' '}
        add credits{' '}
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
creditPurchase.getLayoutFunc = function getLayout(page, pageProps) {
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
