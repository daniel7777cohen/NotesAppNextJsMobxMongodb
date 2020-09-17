import React, { useState } from "react";
import {
  faTrashAlt,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { ItemWrapper } from "../../styled-components";
import { Todo } from "../create-note/CreateNote";

const TodoDisplay = ({
  todo,
  isViewPage,
  index,
  handleRemoveTodo,
}: {
  handleRemoveTodo?: (index: number) => void;
  index?: number;
  isViewPage?: boolean;
  todo: Todo;
}) => {
  const [checkedItem, setCheckedItem] = useState(todo.checked);

  const onChange = (todo) => {
    debugger;
    todo.checked = !checkedItem;
    setCheckedItem(!checkedItem);
  };
  
  return (
    <div>
      <ItemWrapper>
        <div>{todo.description}</div>
        {!isViewPage ? (
          <FAI
            icon={faTrashAlt}
            onClick={() => {
              handleRemoveTodo(index);
            }}
          ></FAI>
        ) : (
          <FAI
            icon={checkedItem ? faThumbsUp : faThumbsDown}
            onClick={() => {
              onChange(todo);
            }}
          ></FAI>
        )}
      </ItemWrapper>
    </div>
  );
};

export default TodoDisplay;
