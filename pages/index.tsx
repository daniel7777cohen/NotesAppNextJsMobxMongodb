import Link from "next/link";
import { ButtonStyled, CardWrapper, Row } from "../styled-components";
import CardDisplay from "../components/Layout/CardDisplay";
import { observer } from "mobx-react-lite";
import { IStore, Note } from "../interfaces";

export const HomePage = observer(({ notesStore }: IStore) => {
  const notes = notesStore.notes;
  const handleDelete = async (id: number, index: number) => {
    try {
      await notesStore.deleteNote(id, index);
    } catch (error) {
      //Todo handle
    }
  };

  return (
    <CardWrapper>
      {notes && notes.length > 0 ? (
        <Row gutter={16}>
          {notes.map((note: Note, index: number) => {
            return (
              <CardDisplay
                index={index}
                children
                note={note}
                handleDelete={handleDelete}
              ></CardDisplay>
            );
          })}
        </Row>
      ) : (
        <div>
          You have no notes to display. <br />
          to create a new note <br />
          <ButtonStyled type="primary">
            <Link href="/note/create">
              <a>click here !</a>
            </Link>
          </ButtonStyled>
        </div>
      )}
    </CardWrapper>
)});

export default HomePage;

