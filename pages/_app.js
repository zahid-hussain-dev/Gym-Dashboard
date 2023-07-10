import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import "../app/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // if(router.asPath === "/OtpValidate" || router.asPath === "/Signup") return (<Component {...pageProps}/>); else return (<Layout><Component {...pageProps}/></Layout>)


  return (
    <>
      {router.asPath === "/OtpValidate" || router.asPath === "/Signup" || router.asPath === "/Login" ?
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
        :
        <Layout>
          <Component {...pageProps} />
        </Layout>
      }

    </>
  );
}
