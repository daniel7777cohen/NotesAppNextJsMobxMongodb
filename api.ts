import axios from "axios";
import { Todo, Note, NoteResponse } from "./interfaces";

export const fetchNotes = async (): Promise<{
  success: boolean;
  processedNotes?: Note[];
}> => {
  const notesResponse = await axios.get("http://localhost:3000/api/notes");
  if (!notesResponse.data.success === true) return { success: false };

  const { success, processedNotes } = notesResponse.data;
  return { success, processedNotes };
};

export const createNewNote = async (
  title: string,
  todos: Todo[]
): Promise<{ success: boolean; processedNewNote?: Note }> => {
  const noteResponse = await axios.post("http://localhost:3000/api/notes", {
    title,
    todos,
  });
  if (!noteResponse.data.success === true) return { success: false };
  const { processedNewNote, success } = noteResponse.data;
  return {
    success,
    processedNewNote,
  };
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
