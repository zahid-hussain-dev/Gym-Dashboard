import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import store from "../store/ConfigureStore";
import "../styles/global.css";
import "../app/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
    <Provider store={store}>
      {router.asPath === "/signup" || router.asPath === "/login" ?
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
        :
        <Layout>
          <Component {...pageProps} />
        </Layout>
      }
      </Provider>
    </>
  );
}
