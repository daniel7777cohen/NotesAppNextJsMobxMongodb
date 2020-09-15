import { observable, action, computed } from "mobx";
import { fetchNotes } from "../api";

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

class NotesStore {
  @observable notes: INotes[] = observable([]);
  @observable testArray = ["a", "b", "c"];

  constructor(initialData = {} as { notes: INotes[] }) {
    this.notes = initialData.notes;
  }

  async fetch() {
    const processedResponse = await fetchNotes();
    this.setNotes(processedResponse);
  }

  @computed get testArrayLength() {
    return this.testArray.length;
  }

  @computed get notesArrayLength() {
    return this.notes.length;
  }

  @action getUncompletedTasks(note) {
    return note.todos.filter((todo) => !todo.checked).length;
  }
  @action setNotes(notes) {
    this.notes = notes;
  }
  // @computed get test() {
  //   {console.log("nodeStore222===", this.notes)}
  //   {console.log("noteslength==", this.notes.length)}
  //   return this.notes.length;
  // }
}

export default NotesStore;
