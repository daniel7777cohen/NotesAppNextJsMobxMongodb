import { useState, useEffect } from "react";
import styled from "styled-components";

const AddTodoWrapper = styled.div`
text-align:center
margin-top:10px`;

const Input = styled.input`
  padding: 7px;
  width: 250px;
  border-radius: 5px;
  border: 0px;
  margin-bottom: 3rem;
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
const CreateNoteTitle = ({ setTitle, notesStore }) => {
  const [value, setValue] = useState("");
  debugger;
  const handleSumbitNodeTitle = () => {
    setTitle(value);
  };

  const handleChange = (e) => {
    e.preventDefault;
    setValue(e.target.value);
  };
  return (
    <div>
      <AddTodoWrapper>
        <Input
          type="text"
          onChange={handleChange}
          name="todo"
          placeholder="Write your note title here ..."
        />
        <Button
          onClick={() => {
            handleSumbitNodeTitle();
          }}
          type="button"
          name="addTodo"
        >
          Submit
        </Button>
      </AddTodoWrapper>
    </div>
  );
};

export default CreateNoteTitle;
