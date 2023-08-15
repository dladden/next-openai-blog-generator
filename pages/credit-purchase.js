import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function creditPurchase() {
  return (
    <div>
      <h1>TextFlow AI: Credit Purchase</h1>
    </div>
  );
}
//this special function runs server-side when requested
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
