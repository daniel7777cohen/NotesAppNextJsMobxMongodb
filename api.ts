import axios from "axios";
import { Todo, Note, NoteResponse } from "./interfaces";

export const fetchNotes = async (): Promise<{
  success: boolean;
  processedNotes?: Note[];
}> => {
  const notesResponse = await axios.get("http://localhost:3000/api/notes");
  if (!notesResponse.data.success === true) return { success: false };
  const { notes } = notesResponse.data;
  const { processedNotes, success } = await fetchAndAddTodosToNote(notes);
  return { success, processedNotes };
};

const fetchAndAddTodosToNote = async (
  notes: NoteResponse[]
): Promise<{ success: boolean; processedNotes?: Note[] }> => {
  let processedNotes = [] as Note[];

  for (const note of notes) {
    const todoResponse = await axios.get(
      `http://localhost:3000/api/items/get-items-by-note-id/${note._id}`
    );
    if (!todoResponse.data.success) return { success: false };
    const { todos } = todoResponse.data;
    processedNotes.push({ ...note, todos });
  }
  return { success: true, processedNotes };
};

export const createNewNote = async (
  title: string,
  todos: Todo[]
): Promise<{ success: boolean; newNote?: Note }> => {
  const noteResponse = await axios.post("http://localhost:3000/api/notes", {
    title,
  });
  if (!noteResponse.data.success === true) return { success: false };
  const { newNote } = noteResponse.data;
  const { processedNewTodos, success } = await getProcessedNewTodos(
    todos,
    newNote._id
  );
  return {
    success,
    newNote: {
      ...newNote,
      todos: processedNewTodos,
    },
  };
};

const getProcessedNewTodos = async (
  todos: Todo[],
  noteId: string
): Promise<{ processedNewTodos?: Todo[]; success: boolean }> => {
  const processedNewTodos = [] as Todo[];

  let success = true;
  for (const todo of todos) {
    const { description, checked } = todo;
    const todoResponse = await axios.post(
      `http://localhost:3000/api/items/add-item-to-note/${noteId}`,
      {
        description,
        checked,
      }
    );
    if (!todoResponse.data.success) return { success: false };
    const { newTodo } = todoResponse.data;
    processedNewTodos.push(newTodo);
  }
  return { processedNewTodos, success };
};

export const deleteNote = async (note_id: string): Promise<boolean> => {
  const deleteNoteResponse = await axios.delete(
    `http://localhost:3000/api/notes/${note_id}`
  );

  return deleteNoteResponse.data.success;
};

export const saveTodosStatuses = async (todos: Todo[]): Promise<boolean> => {
  let success = true;
  for (const todo of todos) {
    const todoResponse = await axios.put(
      `http://localhost:3000/api/items/edit-item/${todo._id}`,
      {
        checked: todo.checked,
      }
    );
    if (todoResponse.data.success === false) success = false;
  }

  return success;
};
