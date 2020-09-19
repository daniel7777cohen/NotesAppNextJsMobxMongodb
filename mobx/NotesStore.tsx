import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, action, flow, runInAction, computed } from "mobx";
import {
  deleteNote,
  fetchNotes,
  saveTodosStatuses,
  createNewNote,
} from "../api";
import { Note, Todo, TodoForm } from "../interfaces";

export class NotesStore extends BaseStore {
  @observable notes: Note[] = [];

  constructor() {
    super();
    console.log(!process.browser ? "server contructor" : "client constructor");
  }

  @action
  async deleteNote(noteId: number, index: number) {
    try {
      await deleteNote(noteId);
      runInAction(() => {
        this.notes.splice(index, 1);
      });
    } catch (error) {
      runInAction(() => {});
    }
  }

  @action
  async savetodosEdit(todos: Todo[]) {
    await saveTodosStatuses(todos);
    // runInAction(()=>{
    //   const newTodos =
    // })
  }
  async fetchAndSetNotes() {
    const processedResponse = await fetchNotes();
    this.setNotes(processedResponse);
  }

  @action
  async addNote(title: string, todos: TodoForm[]) {
    try {
      const newNote = await createNewNote(title, todos);
      runInAction(() => {
        this.notes.push(newNote);
      });
    } catch (error) {
      runInAction(() => {});
    }
  }

  @action setNotes(notes: Note[]) {
    this.notes = notes;
  }

  @action getNoteById(noteId: string) {
    return this.notes.find((note) => note._id === noteId);
  }

  @action toggleTodoStatus(todo: Todo) {
    todo.checked = !todo.checked;
  }

  @computed get getNotesLength() {
    return this.notes.length;
  }

  @action getNotes() {
    return this.notes;
  }
}

// Make sure the store’s unique name
// AND must be same formula
// Example: getUserStore => userStore
// Example: getProductStore => productStore
export const getNotesStore = getOrCreateStore("notesStore", NotesStore);
