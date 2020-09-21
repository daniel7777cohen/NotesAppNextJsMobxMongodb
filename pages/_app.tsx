import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import Layout from "../components/Layout/Layout";
import "../css-general/index.css";
import "../css-general/normalize.css";
import { withMobx } from "next-mobx-wrapper";
import { configure } from "mobx";
import { Provider, useStaticRendering, observer } from "mobx-react";
import * as getStores from "../mobx";
import { Store, Note } from "../interfaces";
import { fetchNotes } from "../api";
import { NextPageContext, NextComponentType } from "next";

const isServer = !process.browser;

configure({ enforceActions: "observed" });
useStaticRendering(isServer); // NOT `true` value

const MyApp = ({
  Component,
  store,
  pageProps,
  processedNotes,
}: AppProps & { store: Store; processedNotes: Note[] }) => {
  store.notesStore.setNotes(processedNotes);
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
};

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  ctx: NextPageContext;
}) => {
  const notesResponse = await fetchNotes();
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  if (notesResponse.success) {
    const { processedNotes } = notesResponse;
    return { pageProps, processedNotes };
  }
  const processedNotes = {} as Note[];
  return { pageProps, processedNotes };
};

export default withMobx(getStores)(MyApp);
