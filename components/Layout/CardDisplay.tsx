import React, { useContext } from "react";
import Link from "next/link";
import moment from "moment";
import "moment-timezone";
import {
  CardStyled,
  Title,
  CardBodyWrapper,
  Col,
} from "../../styled-components";
import { useState } from "react";
import { ICardDisplay } from "../../interfaces";
import { observer } from "mobx-react-lite";
import DeleteWarning from "./DeleteWarning";
import CardBody from "./CardBody";

const CardDisplay = observer(
  ({ children, note, index, handleDelete }: ICardDisplay) => {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
      <Col key={index} span={8}>
        <CardStyled
          title={
            <Title>
              <Link href={`/note/${note._id}`}>
                <a>
                  <h1>{note.title.toUpperCase()}</h1>
                </a>
              </Link>
            </Title>
          }
          bordered={false}
        >
          <CardBodyWrapper>
            <CardBody
              note={note}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
            ></CardBody>

            {isDeleting && (
              <DeleteWarning
                handleDelete={handleDelete}
                setIsDeleting={setIsDeleting}
                children={children}
                noteId={note._id}
                index={index}
              />
            )}
          </CardBodyWrapper>
        </CardStyled>
      </Col>
    );
  }
);

export default CardDisplay;
