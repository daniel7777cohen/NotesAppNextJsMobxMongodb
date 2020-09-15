import CreateTodo from "../../components/CreateTodo";
import TodoList from "../../components/TodoList";
import CreateNoteTitle from "../../components/CreateNoteTitle";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { CreateNewNote } from "../../api";
import { useRouter } from "next/router";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../context/StoreContext";

const Box = styled.div`
  background: #f0f2f5;
  color: black;
  width: 100%;
  height: 170px;

  h2,
  h4 {
    color: black;
    margin: 0;
    padding: 10px 10px 10px 0px;
  }
`;

const Button = styled.button`
  color: white;
  background: dodgerblue;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 5px;
  border-radius: 6px;
  margin-left: 15px;
  cursor: pointer;
`;

export interface INotes {
  title: string;
  todos: {
    description: string;
    checked: boolean;
  }[];
}

const NewNote = () => {
  const notesStore = useStore();
  debugger;

  return useObserver(() => {
    const [error, setError] = useState("");
    const [title, setTitle] = useState<string>("");
    const [todos, setTodos] = useState<INotes["todos"]>([]);
    const router = useRouter();

    const handleRemoveTodo = (index: number) => {
      setTodos((prev) => {
        const newTodos = [...prev];
        newTodos.splice(index, 1);
        return newTodos;
      });
    };

    const handleSave = async () => {
      debugger;
      const newNote = { title, todos };
      try {
        await CreateNewNote(title, todos);
        debugger;
        router.push("/");
      } catch (error) {
        debugger;
        console.log(error);
        // setError(error.data.msg);
      }
    };

    return (
      <Box>
        {error && <div>{error}</div>}
        <h2>Set a title for your note</h2>

        <CreateNoteTitle
          setTitle={setTitle}
          notesStore={notesStore}
        ></CreateNoteTitle>
        {title && (
          <>
            <h1>{title}</h1>
            <CreateTodo setTodos={setTodos} />
          </>
        )}
        <TodoList handleRemoveTodo={handleRemoveTodo} todos={todos} />
        {todos.length > 0 && <Button onClick={handleSave}>Save</Button>}
      </Box>
    );
  });
};

export default NewNote;
