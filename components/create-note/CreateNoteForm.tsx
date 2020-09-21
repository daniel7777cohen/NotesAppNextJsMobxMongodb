import {
  AddTodoWrapper,
  Input,
  Button,
  InputWrapper,
} from "../../styled-components";
import { useState, ChangeEvent } from "react";
import { CreateNoteFormProps } from "../../interfaces";

const CreateNoteForm = ({ onAddTitle, onAddTodo }: CreateNoteFormProps) => {
  const [todo, setTodo] = useState<{ description: string; checked: boolean }>(
    { description: "", checked: false }
  );

  const handleChangeTitle = (e:ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault;
    onAddTitle(e.target.value);
  };

  const handleChangeTodo = (e:ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault;
    setTodo({ description: e.target.value, checked: false });
  };
  return (
    <div>
      <AddTodoWrapper>
        <h1>Title</h1>
        <Input
          style={{ marginBottom: "1rem" }}
          type="text"
          onChange={handleChangeTitle}
          name="title"
          placeholder="Write your note title here ..."
        />
        <>
          <h1>Todo</h1>
          <InputWrapper>
            <Input
              value={todo.description}
              type="text"
              onChange={handleChangeTodo}
              name="todo"
              placeholder="Whats needs to be done?"
            />
            <Button
              disabled={!todo.description}
              onClick={() => {
                onAddTodo(todo);
                setTodo({ description: "", checked: false });
              }}
            >
              Add
            </Button>
          </InputWrapper>
        </>
      </AddTodoWrapper>
    </div>
  );
};

export default CreateNoteForm;
