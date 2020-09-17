import { observable, action, computed } from "mobx";
import { deleteNote } from "../api";

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

  // @action addNewNote = (note: INotes) => {
  //   this.notes.push(note);
  // };

  async deleteNote(id: number) {
    debugger;
    await deleteNote(id);
  }

  setNotes(notes: INotes[]) {
    this.notes = notes;
  }

}

export const notesStore = new NotesStore();
