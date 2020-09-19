import { TodoListWrapper, Ul, Button } from "../../styled-components";
import TodoDisplay from "./TodoDisplay";
import { Todo } from "../../interfaces";
import { observer } from "mobx-react-lite";

const TodoList = observer(({
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
  return (
    <TodoListWrapper>
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
        <Button isSavedButton={true} onClick={onSaveClicked}>
          Save 
        </Button>
      )}
    </TodoListWrapper>
  );
});

export default TodoList;
