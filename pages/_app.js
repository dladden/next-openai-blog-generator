import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Ubuntu, Open_Sans } from "@next/font/google";

const ubuntu = Ubuntu({
  weight: ["400"],
  subsets: ["latin"],
  variable: ["--font-ubuntu"],
});

const openSans = Open_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: ["--font-open-serif"],
});

function MyApp({ Component, pageProps }) {
  //checking to see if the component has the getLayout function or render without
  const getLayout = Component.getLayoutFunc || ((page) => page);
  return (
    <UserProvider>
      <main className={`${ubuntu.variable} ${openSans.variable} font-body`}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
    </UserProvider>
  );
}

export default MyApp;
