import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, action, flow, runInAction, computed } from "mobx";
import {
  deleteNote,
  fetchNotes,
  saveTodosStatuses,
  createNewNote,
} from "../api";
import { Note, Todo } from "../interfaces";
import { computedFn, keepAlive } from "mobx-utils";

export class NotesStore extends BaseStore {
  @observable notes: Note[] = [];

  constructor() {
    super();
    console.log(!process.browser ? "server contructor" : "client constructor");
  }

  @action
  async deleteNote(noteId: string, index: number): Promise<void> {
    try {
      const success = await deleteNote(noteId);
      runInAction(() => {
        if (success) this.notes.splice(index, 1);
      });
    } catch (error) {
      runInAction(() => {
        console.error(error);
      });
    }
  }

  @action
  async saveTodosEdit(todos: Todo[]): Promise<boolean> {
    const success = await saveTodosStatuses(todos);
    return success;
  }

  @action
  async addNote(title: string, todos: Todo[]): Promise<boolean> {
    try {
      const res = await createNewNote(title, todos);
      if (res.success) {
        runInAction(() => {
          this.notes.push(res.processedNewNote);
        });
      }
      return res.success;
    } catch (error) {
      return false;
    }
  }

  @action setNotes(notes: Note[]): void {
    this.notes = notes;
  }

  @action getNoteById(noteId: string): Note {
    return this.notes.find((note) => note._id === noteId);
  }

  @action getRecentUpdateDate = (note: Note): number => {
    return Math.max.apply(
      Math,
      note.todos.map((note) => {
        return note.updatedAt;
      })
    );
  };

  @computed get totalNotes(): number {
    return this.notes.length;
  }

  @action toggleTodoStatus(todo: Todo): void {
    todo.checked = !todo.checked;
  }

  @action
  isTitleExists(newTitle: string): boolean {
    return this.notes.filter((note) => note.title === newTitle).length === 0;
  }

  getUnDoneTodos = computedFn(function getUnDoneTodos(note: Note): number {
    return note.todos.filter((todo) => !todo.checked).length;
  });
  get isAddAvailable(): boolean {
    return this.notes.length < 10;
  }
}

export const getNotesStore = getOrCreateStore("notesStore", NotesStore);
