import { TodoListWrapper, Ul, Button } from "../../styled-components";
import TodoDisplay from "./TodoDisplay";
import { Todo } from "../../interfaces";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Spin } from "antd";

const TodoList = observer(
  ({
    handleRemoveTodo,
    todos,
    onSaveClicked,
    isViewPage = false,
  }: {
    handleRemoveTodo?: (index: number) => void;
    onSaveClicked: () => Promise<void>;
    todos: Todo[];
    isViewPage?: boolean;
  }) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const handleSaveClick = async () => {
      setIsSaving(true);
      await onSaveClicked();
      setIsSaving(false);
    };

    return (
      <TodoListWrapper>
        {isSaving && <Spin size="large" />}
        <Ul style={{ margin: "2rem" }}>
          {todos.map((todo: Todo, index: number) => {
            return (
              <li key={index}>
                <TodoDisplay
                  todo={todo}
                  index={index}
                  isViewPage={isViewPage}
                  handleRemoveTodo={handleRemoveTodo}
                ></TodoDisplay>
              </li>
            );
          })}
        </Ul>
        {todos.length > 0 && (
          <Button isSavedButton={true} onClick={handleSaveClick}>
            Save
          </Button>
        )}
      </TodoListWrapper>
    );
  }
);

export default TodoList;
