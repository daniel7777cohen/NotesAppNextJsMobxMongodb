import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import Layout from "../components/Layout/Layout";
import "../css-general/index.css";
import "../css-general/normalize.css";
import { withMobx } from "next-mobx-wrapper";
import { configure } from "mobx";
import { Provider, useStaticRendering } from "mobx-react";
import * as getStores from "../mobx";
import { Store, Note } from "../interfaces";

const isServer = !process.browser;

configure({ enforceActions: "observed" });
useStaticRendering(isServer); // NOT `true` value


function MyApp({
  Component,
  store,
  pageProps,
  notes,
}: AppProps & { store: Store; notes: Note[] }) {
  store.notesStore.setNotes(notes);
  return (
    <div>
      <Provider {...store}>
        <Layout>
          <Component {...pageProps} {...store}></Component>
        </Layout>
      </Provider>

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

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: any;
  ctx: any;
}) => {
  
  const notesStore = getStores.getNotesStore();
  await notesStore.fetchAndSetNotes();
  const notes = notesStore.getNotes();
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, notes };
};

export default withMobx(getStores)(MyApp);
