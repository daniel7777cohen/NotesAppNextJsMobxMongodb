//implementaion built for having multiple stores!

import { useStaticRendering } from "mobx-react";
import { NotesStore } from "./NotesStore";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store: {
  notesStore: NotesStore;
} = null;

export default function initializeStore(
  initialData = { notesStore: {} as NotesStore }
) {
  if (isServer) {
    return (store = {
      notesStore: new NotesStore(initialData.notesStore),
    });
  }
  if (store === null) {
    store = {
      notesStore: new NotesStore(initialData.notesStore),
    };
  }

  return store;
}
