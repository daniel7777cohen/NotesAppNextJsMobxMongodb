import { useState, useEffect } from "react";
import TodoList from "../../../components/Layout/TodoList";
import { TodoListTitle, Alert } from "../../../styled-components";
import { observer } from "mobx-react-lite";
import { NextPage, NextPageContext } from "next";
import { NotesStore } from "../../../mobx/NotesStore";
import { NoteDisplayProps, Note } from "../../../interfaces";
import { Spin } from "antd";

interface Context extends NextPageContext, NoteDisplayProps {}

export const NoteDisplay: NextPage<NoteDisplayProps> = observer(
  ({ notesStore, note_id }: { note_id: string; notesStore: NotesStore }) => {
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
    const [alert, setAlert] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
      const noteToDisplay = notesStore.getNoteById(note_id);
      setCurrentNote(noteToDisplay);
      setIsPageLoaded(true);
    }, []);

    const onSaveClicked = async (): Promise<void> => {
      try {
        setAlert("");
        const isSaveSuccess = await notesStore.saveTodosEdit(currentNote.todos);
        setSuccess(isSaveSuccess);
        if (!isSaveSuccess) {
          setAlert("something went wrong, current changes were not saved");
        } else {
          setAlert("current changes were saved successfully !");
        }
      } catch (error) {}
    };

    return (
      <div>
        {isPageLoaded ? (
          <div>
            <TodoListTitle>{currentNote.title.toUpperCase()}</TodoListTitle>
            <TodoList
              onSaveClicked={onSaveClicked}
              todos={currentNote.todos}
              isViewPage={true}
            ></TodoList>
            {alert && (
              <Alert message={alert} type={success ? "success" : "error"} />
            )}
          </div>
        ) : (
          <Spin size="large" />
        )}
      </div>
    );
  }
);

NoteDisplay.getInitialProps = async ({ query: { note_id } }: Context) => {
  return { note_id };
};

export default NoteDisplay;
