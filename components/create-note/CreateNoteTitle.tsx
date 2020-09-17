import { AddTodoWrapper, Input, Button } from "../../styled-components";

const CreateNoteTitle = ({ onAddTitle }) => {
  const handleChange = (e) => {
    e.preventDefault;
    onAddTitle(e.target.value);
  };
  return (
    <div>
      <AddTodoWrapper>
        <h1>Title</h1>
        <Input style ={{marginBottom:'1rem'}}
          type="text"
          onChange={handleChange}
          name="todo"
          placeholder="Write your note title here ..."
        />
      </AddTodoWrapper>
    </div>
  );
};

export default CreateNoteTitle;
