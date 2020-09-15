import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getNoteById, getTodosByNoteId, deleteNote } from "../../../api";
import styled from "styled-components";
import { Skeleton } from "antd";
import Link from "next/link";
import { ButtonStyled } from "../..";

const Button = styled.button`
  color: white;
  background: red;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 5px;
  border-radius: 6px;
  margin-left: 15px;
  cursor: pointer;
`;
const NoteDisplay = ({
  note,
  todos,
  processedResponse,
  notesStore,
  note_id,
}) => {
  const router = useRouter();

  const [currentNote, setCurrentNote] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const notes = notesStore.notes;
    const filteredNote = notes.find((note) => note._id === note_id);
    setCurrentNote(filteredNote);
    setIsPageLoaded(true);
  }, []);

  const handleDelete = async () => {
    //remove from db
    // remove from store
    try {
      await deleteNote(currentNote._id);
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isDeleted && (
        <div>
          Note deleted succesfully
          <ButtonStyled>
            <Link href={`/`}>
              <a>Back To Home Page</a>
            </Link>
          </ButtonStyled>
        </div>
      )}
      {isPageLoaded && isDeleting && !isDeleted ? (
        <div>
          <span>are you sure you want to delete the current note?</span>
          <Button onClick={() => handleDelete()}>YES</Button>
          <Button onClick={() => setIsDeleting(false)}>NO</Button>
        </div>
      ) : !isDeleted && isPageLoaded ? (
        <div>
          <h1>{currentNote.title}</h1>
          <br />
          <ul>
            {currentNote.todos.map((todo, index: number) => {
              return <li key={index}>{todo.description}</li>;
            })}
          </ul>
          <Button onClick={() => setIsDeleting(true)}>Delete Note</Button>
        </div>
      ) : null}
    </div>
  );
};

NoteDisplay.getInitialProps = async ({ query: { note_id } }) => {
  const noteResponse = await getNoteById(note_id);
  if (noteResponse.success) {
    const { note } = noteResponse;
    const todosResponse = await getTodosByNoteId(note._id);
    if (todosResponse.success) {
      const { todos } = todosResponse;
      return { note, todos, note_id };
    }
  }
  return { note: {}, todos: {} };
};

export default NoteDisplay;
