import { observable, action, computed } from "mobx";
import { getTodos, postTodos, fetchNotes } from "../api";

import { useStaticRendering } from "mobx-react";
import { createContext } from "vm";

const isServer = typeof window === "undefined";

// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer);

export interface INotes {
  createdAt?: number;
  updatedAt?: number;
  __v?: number;
  _id?: number;
  title: string;
  todos: {
    description: string;
    checked: boolean;
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

  @action getNoteById(id: number) {
    return this.notes[0];
  }

  setNotes(notes: INotes[]) {
    this.notes = notes;
  }
  async loadTodos() {
    const fetchedNotes = await fetchNotes();
    this.notes = fetchedNotes;
  }
}
// export default createContext(observable(new NotesStore()));
