import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }) {
  //checking to see if the component has the getLayout function or render without
  const getLayout = Component.getLayoutFunc || ((page) => page);
  return (
    <UserProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </UserProvider>
  );
}

export default MyApp;
