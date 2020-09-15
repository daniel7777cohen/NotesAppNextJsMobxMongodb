// import App from "next/app";
import type { AppProps /*, AppContext */, AppContext } from "next/app";
import { RootStateProvider, useRootStore } from "../context/RootStateContext";
import "antd/dist/antd.css";
import { fetchNotes } from "../api";
import { useEffect, useState } from "react";
import App from "next/app";
import { NotesStore } from "../mobx/NotesStore";
import HomePage from ".";
import Layout from "../components/Layout";

function MyApp({
  Component,
  pageProps,
  processedResponse,
  notesStore,
}: AppProps) {
  debugger;
  return (
    <div>
      <Layout>
        <Component
          {...pageProps}
          processedResponse={processedResponse}
          notesStore={notesStore}
        ></Component>
      </Layout>

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
  const processedResponse = await fetchNotes();
  const notesStore = new NotesStore();
  notesStore.setNotes(processedResponse);
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, processedResponse, notesStore };
};

export default MyApp;
