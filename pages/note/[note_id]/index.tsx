import { useState, useEffect } from "react";
import TodoList from "../../../components/Layout/TodoList";
import { TodoListTitle } from "../../../styled-components";
import { observer } from "mobx-react-lite";
import { NextPage, NextPageContext } from "next";
import { NotesStore } from "../../../mobx/NotesStore";

interface INoteDisplay {
  note_id: string | string[];
}

interface Context extends NextPageContext, INoteDisplay {
}

export const NoteDisplay: NextPage<INoteDisplay> = observer(
  ({ notesStore, note_id }: { note_id: string; notesStore: NotesStore }) => {

    const [currentNote, setCurrentNote] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
      const noteToDisplay = notesStore.getNoteById(note_id);
      setCurrentNote(noteToDisplay);
      setIsPageLoaded(true);
    }, []);

    const onSaveClicked = async () => {
      try {
        await notesStore.savetodosEdit(currentNote.todos);
      } catch (error) {}
    };

    return (
      <div>
        {isPageLoaded ? (
          <div>
            <TodoListTitle>{notesStore.getNoteById(note_id).title.toUpperCase()}</TodoListTitle>
            <TodoList
              onSaveClicked={onSaveClicked}
              todos={notesStore.getNoteById(note_id).todos}
              isViewPage={true}
            ></TodoList>
            <br />
          </div>
        ) : null}
      </div>
    );
  }
);

NoteDisplay.getInitialProps = async ({ query: { note_id } }: Context) => {

  return { note_id };
};

export default NoteDisplay;
