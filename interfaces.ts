import { NotesStore } from "./mobx/NotesStore";

export interface IStore {
  notesStore: NotesStore;
}

export interface ICardDisplay {
  handleDelete: (id: string, index: number) => Promise<void>;
  index: number;
  note: Note;
  children?: React.ReactNode;
}

export interface Note {
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

export interface TodoForm {
  description: string;
  checked: boolean;
}

export interface Store {
  notesStore: NotesStore;
}

export interface CardBodyProps {
  note: Note;
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DeleteWarningProps {
  children: any;
  handleDelete: (id: string, index: number) => Promise<void>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  noteId: string;
}
