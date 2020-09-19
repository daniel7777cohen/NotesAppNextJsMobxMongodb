import React from "react";
import CreateTodo from "./CreateTodo";
import TodoList from "../Layout/TodoList";
import CreateNoteTitle from "./CreateNoteTitle";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Paragraph, TodoListTitle } from "../../styled-components";
import { Todo } from "../../interfaces";



const EditNote = ({
  todosToEdit,
  titleToEdit,
  children,
  handleSave,
}: {
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
}) => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState<string>(titleToEdit || "");
  const [todos, setTodos] = useState<Todo[]>(todosToEdit || []);
  const router = useRouter();
  


  const handleRemoveTodo = (index: number) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  const onSaveClicked = async () => {
    await handleSave({ title, todos });
  };

  const onAddTitle = (value) => {
    setTitle(value);
  };
  
  const onAddTodo = (value) => {
    setTodos((prev) => {
      return [...prev, value];
    });
  };
  return (
    <>
      <Paragraph>Create Todos</Paragraph>
      <Box>
        {error && <div>{error}</div>}
        <CreateNoteTitle onAddTitle={onAddTitle}></CreateNoteTitle>
        {title && (
          <>
            <CreateTodo onAddTodo={onAddTodo} />
            <TodoListTitle>{title}</TodoListTitle>
          </>
        )}
        {todos && (
          <TodoList
            handleRemoveTodo={handleRemoveTodo}
            todos={todos}
            onSaveClicked={onSaveClicked}
          />
        )}
      </Box>
    </>
  );
};

export default EditNote;
