import { useState } from "react";
import { AddTodoWrapper, Input, Button, InputWrapper } from "../../styled-components";


const CreateTodo = ({ onAddTodo }) => {
  const [value, setValue] = useState<{ description: string; checked: boolean }>(
    { description: "", checked: false }
  );

  const handleChange = (e) => {
    e.preventDefault;
    setValue({ description: e.target.value, checked: false });
  };
  return (
    <AddTodoWrapper>
      <>
        <h1>Todo</h1>
        <InputWrapper>
          <Input
            value={value.description}
            type="text"
            onChange={handleChange}
            name="todo"
            placeholder="Whats needs to be done?"
          />
          <Button
            disabled={!value.description}
            onClick={() => {
              onAddTodo(value);
              setValue({ description: "", checked: false });
            }}
          >
            Add
          </Button>
        </InputWrapper>
      </>
    </AddTodoWrapper>
  );
};

export default CreateTodo;
