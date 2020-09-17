import { useStore } from "../context/StoreContext";
import Link from "next/link";
import { useObserver } from "mobx-react-lite";
import { ButtonStyled, CardWrapper, Row } from "../styled-components";
import { deleteNote } from "../api";
import CardDisplay from "../components/Layout/CardDisplay";

export const HomePage = () => {
  const notesStore = useStore();

  return useObserver(() => {
    const handleDelete = async (id: number) => {
      try {
        debugger;
        notesStore.setNotes(null);
        await notesStore.deleteNote(id);
      } catch (error) {
        debugger;
        console.log(error);
      }
    };

    return (
      <CardWrapper>
        {notesStore.notes && notesStore.notes.length > 0 ? (
          <Row gutter={16}>
            {notesStore.notes.map((note, index) => {
              return (
                <CardDisplay
                  key={index}
                  children
                  note={note}
                  index={index}
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
              <Link href="/note/create-note">
                <a>click here !</a>
              </Link>
            </ButtonStyled>
          </div>
        )}
      </CardWrapper>
    );
  });
};

export default HomePage;
