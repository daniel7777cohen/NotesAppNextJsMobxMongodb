import { observable, action, computed } from "mobx";
import { getTodos, postTodos, fetchNotes } from "../api";

import { useStaticRendering } from "mobx-react";
import { createContext } from "vm";

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

  constructor(initialData = {} as { notes: INotes[] }) {
    this.notes = initialData.notes;
  }

  @action addNewNote = (note: INotes) => {
    this.notes.push(note);
  };

  setNotes(notes: INotes[]) {
    this.notes = notes;
  }

}

export const notesStore = new NotesStore();
