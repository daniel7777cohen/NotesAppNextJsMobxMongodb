import { NotesStore } from "./mobx/NotesStore";

export interface ButtonProps {
  isSavedButton?: boolean;
  isRedirect?: boolean;
}

export interface HomePageProps {
  notesStore: NotesStore;
}

export interface CardDisplayProps {
  handleDelete: (id: string, index: number) => Promise<void>;
  index: number;
  note: Note;
  children?: React.ReactNode;
}

export interface NoteResponse {
  createdAt: number;
  deleted: boolean;
  title: string;
  updatedAt: number;
  __v: number;
  _id: string;
}

export interface Note extends NoteResponse {
  todos: Todo[];
}

export interface Todo {
  description: string;
  checked: boolean;
  createdAt?: number;
  updatedAt?: number;
  note_id?: string;
  __v?: 0;
  _id?: string;
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

export interface NoteDisplayProps {
  note_id: string | string[];
}

export interface EditNoteProps {
  todosToEdit?: Todo[];
  titleToEdit?: string;
  children?: React.ReactNode;
  handleSave: ({
    title,
    todos,
  }: {
    title: string;
    todos: Todo[];
  }) => Promise<void>;
}

export interface CreateNoteFormProps {
  onAddTitle: (value: string) => void;
  onAddTodo: (value: any) => void;
}
