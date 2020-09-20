import axios from "axios";
import { Todo, Note, TodoForm } from "./interfaces";

export const fetchNotes = async () => {
  try {
    const res = await axios.get("/api/notes");
    let processedNotes = [] as any;
    if (res.data.success === true) {
      for (const note of res.data.notes) {
        const todoReponse = await axios.get(
          `/api/items/get-item-by-note-id/${note._id}`
        );
        const { title, createdAt, updatedAt, _id } = note;
        const todos = todoReponse.data.todos;

        processedNotes.push({ _id, title, createdAt, updatedAt, todos });
      }
    }
    return processedNotes;
  } catch (error) {
    console.error(error); //handle errors!!!
    return {} as Note[];
  }
};

export const createNewNote = async (title: string, todos: TodoForm[]) => {
  const noteResponse = await axios.post("/api/notes", {
    title,
  });
  debugger;
  if (noteResponse.data.success === true) {
    const { newNote } = noteResponse.data;
    debugger;
    const processedNewTodos = await getProcessedNewTodos(todos, newNote._id);
    debugger;
    return {
      ...newNote,
      todos: processedNewTodos,
    };
  }
};

const getProcessedNewTodos = async (todos: TodoForm[], noteId: string) => {
  const processedNewTodos = [] as Todo[];

  for (const todo of todos) {
    const { description, checked } = todo;
    const todoResponse = await axios.post(
      `/api/items/add-item-to-note/${noteId}`,
      {
        description,
        checked,
      }
    );
    if (todoResponse.data.success) {
      const { newTodo } = todoResponse.data;
      processedNewTodos.push(newTodo);
    }
  }

  return processedNewTodos;
};
export const getNoteById = async (note_id: string) => {
  const res = await axios.get(`/api/notes/${note_id}`);
  return res.data;
};

export const getTodosByNoteId = async (note_id: string) => {
  const res = await axios.get(`/api/items/get-item-by-note-id/${note_id}`);
  return res.data;
};

export const deleteNote = async (note_id: string) => {
  const res = await axios.delete(`/api/notes/${note_id}`);
  return res.data;
};

export const saveTodosStatuses = async (todos: Todo[]) => {
  for (const todo of todos) {
    const todoResponse = await axios.put(`/api/items/edit-item/${todo._id}`, {
      checked: todo.checked,
    });
  }
};
