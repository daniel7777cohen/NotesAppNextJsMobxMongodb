import { observable, action, computed } from "mobx";
import { getTodos, postTodos, fetchNotes } from "../api";

import { useStaticRendering } from "mobx-react";
import { createContext } from "vm";

// const isServer = typeof window === "undefined";

// // eslint-disable-next-line react-hooks/rules-of-hooks
// useStaticRendering(isServer);

export interface INotes {
  createdAt?: number;
  updatedAt?: number;
  __v?: number;
  _id?: number;
  title: string;
  todos: {
    description: string;
    checked: boolean;
    id: boolean;
  }[];
}

export class NotesStore {
  @observable notes: INotes[] = observable([]);

  @action addNewNote = (note: INotes) => {
    this.notes.push(note);
  };

  @action editTodos = (newTodos: INotes["todos"], title: string) => {
    const element = this.notes.find((note) => note.title === title);
    element.todos = newTodos;
  };

  @computed get test() {
    {console.log("nodeStore222===", this.notes)}
    {console.log("noteslength==", this.notes.length)}
    return this.notes.length;
  }
  @action.bound
  test3() {
    {console.log("nodeStore33===", this.notes)}
    {console.log("noteslength333==", this.notes.length)}
    return this.notes.length;
  }
  setNotes(notes: INotes[]) {
    this.notes = notes;
  }
  async loadTodos() {
    const fetchedNotes = await fetchNotes();
    this.notes = fetchedNotes;
  }
}

export const notesStore = new NotesStore();
