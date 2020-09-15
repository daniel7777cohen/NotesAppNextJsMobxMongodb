import { useStore } from "../context/StoreContext";
import Link from "next/link";
import moment from "moment";
import "moment-timezone";
import { useObserver } from "mobx-react-lite";
import styled from "styled-components";
import { Row, Col, Button, Card } from "antd";

const CardStyled = styled(Card)`
  margin-top: 5rem;
  width: 80%;
`;

export const ButtonStyled = styled(Button)`
  width: 30%;
`;

export const HomePage = () => {
  const notesStore = useStore();
  return useObserver(() => {


    const getRecentUpdateDate = (note) => {
      return Math.max.apply(
        Math,
        note.todos.map((note) => {
          return note.updatedAt;
        })
      );
    };

    return (
      <div className="site-card-wrapper">
        {notesStore.notes && notesStore.notes.length > 0 ? (
          <Row gutter={16}>
            {notesStore.notes.map((note) => {
              const createdAt = moment
                .unix(note.createdAt)
                .format("MM/DD/YYYY hh:mm A");
              const updatedAt = moment
                .unix(getRecentUpdateDate(note))
                .format("MM/DD/YYYY hh:mm A");
              return (
                <Col key={note.title} span={8}>
                  <CardStyled title={note.title} bordered={false}>
                    {console.log("nodeStore===", notesStore)}
                    <span>created :{createdAt}</span> <br />
                    <span>updated : {updatedAt}</span>
                    <br />
                    <br />
                    <ButtonStyled type="primary">
                      <Link href={`/note/${note._id}`}>
                        <a>View</a>
                      </Link>
                    </ButtonStyled>
                    <br />
                    <br />
                    <ButtonStyled type="primary">
                      <Link href={`/${note._id}/edit`}>
                        <a>Edit</a>
                      </Link>
                    </ButtonStyled>
                  </CardStyled>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div>
            You have no notes to display. <br />
            to create a new note <br />
            <Button type="primary">
              <Link href="/note/create-note">
                <a>click here !</a>
              </Link>
            </Button>
          </div>
        )}
      </div>
    );
  });
};

export default HomePage;
