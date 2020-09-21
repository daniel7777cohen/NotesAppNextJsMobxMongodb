import React from "react";
import Link from "next/link";
import {
  CardStyled,
  Title,
  CardBodyWrapper,
  Col,
} from "../../styled-components";
import { useState } from "react";
import { CardDisplayProps } from "../../interfaces";
import { observer } from "mobx-react-lite";
import DeleteWarning from "./DeleteWarning";
import CardBody from "./CardBody";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";

const CardDisplay = observer(
  ({ children, note, index, handleDelete }: CardDisplayProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    return (
      <Col key={index} span={8}>
        <CardStyled
          title={
            <Title>
              <Link href={`/note/${note._id}`}>
                <a>
                  <h1>{note.title.toUpperCase()}</h1>
                  <FAI size="2x" cursor={"pointer"} icon={faEdit}></FAI>
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
