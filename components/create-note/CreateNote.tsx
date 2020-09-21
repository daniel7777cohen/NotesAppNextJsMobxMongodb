import React, { useContext } from "react";
import TodoList from "../Layout/TodoList";
import { useState } from "react";
import { Box, Paragraph, TodoListTitle, Alert } from "../../styled-components";
import { Todo, EditNoteProps } from "../../interfaces";
import { MobXProviderContext } from "mobx-react";
import CreateNoteForm from "./CreateNoteForm";

const CreateNote = ({ children, handleSave }: EditNoteProps) => {
  const { notesStore } = useContext(MobXProviderContext);
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [alert, setAlert] = useState<string>("");

  const handleRemoveTodo = (index: number): void => {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  const runValidations = (): boolean => {
    if (!title) {
      setAlert("Please fill in title");
      return false;
    }
    if (title.length > 16) {
      setAlert(`Title's length cannot exceed 16 characters`);
      return false;
    }
    const isTitleUnique = notesStore.isTitleExists(title);
    if (!isTitleUnique) {
      setAlert(
        "This title already exists at a different note ! please choose a different name"
      );
      return false;
    }
    if (todos.length < 0) {
      setAlert(`Please add a todo`);
      return false;
    }
    return true;
  };

  const onSaveClicked = async (): Promise<void> => {
    setAlert("");
    const isFormValid = runValidations();
    if (isFormValid) await handleSave({ title, todos });
    else {
      window.scrollTo(0, 0);
    }
  };

  const onAddTitle = (title: string): void => {
    setTitle(title);
    setAlert("");
  };

  const onAddTodo = (todo: Todo): void => {
    setTodos((prev) => {
      return [...prev, todo];
    });
  };
  return (
    <>
      <Paragraph>Create Todos</Paragraph>
      <Box>
        {alert && <Alert message={alert} type={"error"} />}
        <CreateNoteForm
          onAddTitle={onAddTitle}
          onAddTodo={onAddTodo}
        ></CreateNoteForm>
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

export default CreateNote;
