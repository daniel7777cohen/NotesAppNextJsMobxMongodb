import { useStaticRendering } from "mobx-react";

import { TodosStore, INotes } from "../mobx/NotesStore";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store = null;

export default function initializeStore(
  initialData = { todosStore: {} as INotes[] }
) {
  if (isServer) {
    return {
        todosStore: new TodosStore(initialData.todosStore),
    };
  }
  if (store === null) {
    store = {
        todosStore: new TodosStore(initialData.todosStore),
    };
  }

  return store;
}
