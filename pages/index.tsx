import Link from "next/link";
import { Button, CardWrapper, Row } from "../styled-components";
import CardDisplay from "../components/Layout/CardDisplay";
import { observer } from "mobx-react-lite";
import { Note, HomePageProps } from "../interfaces";
import Header from "../components/Layout/Header";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";


export const HomePage = observer(({ notesStore }: HomePageProps) => {
  const notes = notesStore.notes;
  const handleDelete = async (id: string, index: number): Promise<void> => {
    try {
      await notesStore.deleteNote(id, index);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header totalNotes={notesStore.totalNotes}></Header>
      {notes && notes.length > 0 ? (
        <CardWrapper>
          <Row gutter={16}>
            {notes.map((note: Note, index: number) => {
              return (
                <CardDisplay
                  key={index}
                  index={index}
                  children
                  note={note}
                  handleDelete={handleDelete}
                ></CardDisplay>
              );
            })}
          </Row>
        </CardWrapper>
      ) : (
        <Result
          icon={<SmileOutlined />}
          title="You have no notes to display yet."
          extra={
            <Button isRedirect>
              <Link href="/note/create">
                <a>Add Note</a>
              </Link>
            </Button>
          }
        />
      )}
    </>
  );
});

export default HomePage;
