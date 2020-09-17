import { TodoListWrapper, Ul, Button } from "../../styled-components";
import { Todo } from "../create-note/CreateNote";
import TodoDisplay from "./TodoDisplay";

const TodoList = ({
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
          Done
        </Button>
      )}
    </TodoListWrapper>
  );
};

export default TodoList;
