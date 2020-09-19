import React, { useContext } from "react";

import {
  faTrashAlt,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { ItemWrapper } from "../../styled-components";
import { Todo } from "../../interfaces";
import * as getStores from "../../mobx";
import { observer } from "mobx-react-lite";
import { MobXProviderContext } from "mobx-react";

const TodoDisplay = observer(
  ({
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
    const {
      notesStore: { toggleTodoStatus },
    } = useContext(MobXProviderContext);

    // const notesStore = getStores.getNotesStore();

    const onChange = (todo: Todo) => {
      toggleTodoStatus(todo);
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
              icon={todo.checked ? faThumbsUp : faThumbsDown}
              onClick={() => {
                onChange(todo);
              }}
            ></FAI>
          )}
        </ItemWrapper>
      </div>
    );
  }
);

export default TodoDisplay;
