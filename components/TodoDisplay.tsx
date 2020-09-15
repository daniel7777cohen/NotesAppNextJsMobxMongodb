import React, { useState } from "react";
import { Checkbox } from "antd";

const TodoDisplay = ({ todo, index }) => {
  const [checkedItem, setCheckedItem] = useState(todo.checked);

  const onChange = (todo) => (e) => {
    // notesStore.setChecked(todo);
    todo.checked = e.target.checked;
    setCheckedItem(e.target.checked);
    debugger;
    console.log(todo.checked);
  };
  return (
    <div>
      <li key={index}>
        {`${todo.description} is ${todo.checked ? "checked" : "not Checked"}`}
        <Checkbox checked={checkedItem} onChange={onChange(todo)}></Checkbox>
      </li>
    </div>
  );
};

export default TodoDisplay;
