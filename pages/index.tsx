import Link from "next/link";
import { Button, Skeleton, Card, Col, Row } from "antd";
import styled from "styled-components";
import { fetchNotes } from "../api";
import moment from "moment";
import "moment-timezone";
import { useObserver } from "mobx-react-lite";
import { useEffect } from "react";
import { INotes } from "../mobx/NotesStore";

const CardStyled = styled(Card)`
  margin-top: 5rem;
  width: 80%;
`;

export const ButtonStyled = styled(Button)`
  width: 30%;
`;

const HomePage = ({ processedResponse, notesStore }) => {
  return useObserver(() => {
    return (
        <div className="site-card-wrapper">
          {notesStore.notes.length > 0 ? (
            <Row gutter={16}>
              {notesStore.notes.map((note) => {
                const createdAt = moment
                  .unix(note.createdAt)
                  .format("MM/DD/YYYY hh:mm A");
                const updatedAt = moment
                  .unix(note.updatedAt)
                  .format("MM/DD/YYYY hh:mm A");
                return (
                  <Col key={note.title} span={8}>
                    <CardStyled title={note.title} bordered={false}>
                      <span>created : {createdAt}</span> <br />
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

// Index.getInitialProps = async () => {
//   const processedResponse = await fetchNotes();
//   console.log(JSON.stringify(processedResponse));
//   return { processedResponse };
// };

export default HomePage;
