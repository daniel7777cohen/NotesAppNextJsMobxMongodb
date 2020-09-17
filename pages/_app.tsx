import initializeStore from "../mobx/stores";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { fetchNotes } from "../api";
import Layout from "../components/Layout/Layout";
import { StoreProvider } from "../context/StoreContext";
import "../css-general/index.css";
import "../css-general/normalize.css";
import { NotesStore } from "../mobx/NotesStore";

function MyApp({
  Component,
  notesStore,
  pageProps,
}: AppProps & { notesStore: NotesStore }) {
  return (
    <div>
      <StoreProvider value={notesStore}>
        <Layout>
          <Component {...pageProps} ></Component>
        </Layout>
      </StoreProvider>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { notesStore } = initializeStore();
  const processedResponse = await fetchNotes();
  notesStore.setNotes(processedResponse);

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { notesStore, pageProps };
};

export default MyApp;
