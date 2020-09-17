import { useState, useEffect } from "react";
import { saveTodosStatuses } from "../../../api";
import { useObserver } from "mobx-react";
import { useStore } from "../../../context/StoreContext";
import TodoList from "../../../components/Layout/TodoList";
import { TodoListTitle } from "../../../styled-components";


const NoteDisplay = ({ note_id }) => {
  const notesStore = useStore();

  return useObserver(() => {
    const [currentNote, setCurrentNote] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
      const notes = notesStore.notes;
      const noteToDisplay = notes.find((note) => note._id === note_id);
      setCurrentNote(noteToDisplay);
      setIsPageLoaded(true);
    }, []);

    const onSaveClicked = async () => {
      debugger;
      try {
        await saveTodosStatuses(currentNote.todos);
      } catch (error) {}
    };

    return (
      <div>
        {isPageLoaded ? (
          <div>
            <TodoListTitle >{currentNote.title}</TodoListTitle>
            <TodoList
              onSaveClicked={onSaveClicked}
              todos={currentNote.todos}
              isViewPage={true}
            ></TodoList>
            <br />
          </div>
        ) : null}
      </div>
    );
  });
};

NoteDisplay.getInitialProps = async ({ query: { note_id } }) => {
  return { note_id };
};

export default NoteDisplay;
