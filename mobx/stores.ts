import { useStaticRendering } from "mobx-react";

import NotesStore, { INotes } from "./testStore";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store = null;

export default function initializeStore(
  initialData = { notesStore: {} as NotesStore }
) {
  if (isServer) {
    return {
      notesStore: new NotesStore(initialData.notesStore),
    };
  }
  if (store === null) {
    store = {
      notesStore: new NotesStore(initialData.notesStore),
    };
  }

  return store;
}
