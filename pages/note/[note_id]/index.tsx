import { useState, useEffect } from "react";
import { deleteNote, saveTodosEdit } from "../../../api";
import styled from "styled-components";
import Link from "next/link";
import { ButtonStyled } from "../..";
import { useObserver } from "mobx-react";
import TodoDisplay from "../../../components/TodoDisplay";
import { useStore } from "../../../context/StoreContext";

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
const NoteDisplay = ({ note_id }) => {
  const notesStore = useStore();

  return useObserver(() => {
    const [currentNote, setCurrentNote] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
      const notes = notesStore.notes;
      const noteToDisplay = notes.find((note) => note._id === note_id);
      setCurrentNote(noteToDisplay);
      setIsPageLoaded(true);
    }, []);

    const handleDelete = async () => {
      try {
        await deleteNote(currentNote._id);
        setIsDeleted(true);
      } catch (error) {
        console.log(error);
      }
    };

    const onChange = (todo) => (e) => {
      e.preventDefault;
      todo.checked = e.target.checked;
    };

    const setDone = async () => {
      try {
        await saveTodosEdit(currentNote.todos);
      } catch (error) {}
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
                return <TodoDisplay todo={todo} index={index}></TodoDisplay>;
              })}
            </ul>
            <Button onClick={() => setIsDeleting(true)}>Delete Note</Button>
            <Button onClick={() => setDone()}>Save</Button>
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
