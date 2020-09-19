import { NotesStore } from "./mobx/NotesStore";

export interface IStore {
  notesStore: NotesStore;
}


export interface Note{
    createdAt: number;
    deleted: boolean;
    title: string;
    updatedAt: number;
    __v: number;
    _id: string;
    todos: Todo[];
  }
  
  export interface Todo {
    checked: boolean;
    createdAt: number;
    updatedAt: number;
    description: string;
    note_id: string;
    __v: 0;
    _id: string;
  }


export interface TodoForm{
    description: string;
    checked: boolean;
}

export interface Store {
    notesStore: NotesStore;
  }

