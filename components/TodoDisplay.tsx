import React, { useState } from "react";
import { Checkbox } from "antd";

const TodoDisplay = ({ todo, index }) => {
  const [checkedItem, setCheckedItem] = useState(todo.checked);

  const onChange = (todo) => (e) => {
    todo.checked = e.target.checked;
    setCheckedItem(e.target.checked);
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
