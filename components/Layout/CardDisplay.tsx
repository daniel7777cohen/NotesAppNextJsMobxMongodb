import React from "react";
import Link from "next/link";
import moment from "moment";
import "moment-timezone";
import { useObserver } from "mobx-react-lite";
import {
  CardStyled,
  Title,
  ButtonWarning,
  CardBodyWrapper,
  IconWrapper,
  Col,
  DateText,
  WarningText,
  WarningButtonsWrapper,
} from "../../styled-components";
import styled from "styled-components";
import { useState } from "react";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { deleteNote } from "../../api";

const CardDisplay = ({ children, note, index, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const getRecentUpdateDate = (note) => {
    return Math.max.apply(
      Math,
      note.todos.map((note) => {
        return note.updatedAt;
      })
    );
  };

  const createdAt = moment.unix(note.createdAt).format("MM/DD/YYYY hh:mm A");
  const updatedAt = moment
    .unix(getRecentUpdateDate(note))
    .format("MM/DD/YYYY hh:mm A");
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
          <DateText>created : {createdAt}</DateText> <br />
          <DateText>updated : {updatedAt}</DateText>
          {!isDeleting && (
            <IconWrapper>
              <FAI
                size="2x"
                cursor={"pointer"}
                icon={faTrashAlt}
                onClick={() => {
                  setIsDeleting(true);
                }}
              ></FAI>
            </IconWrapper>
          )}
          {isDeleting && (
            <>
              <WarningText>Delete Note?</WarningText>
              <WarningButtonsWrapper>
                <ButtonWarning
                  onClick={() => {
                    handleDelete(note._id);
                    setIsDeleting(false);
                  }}
                >
                  Confirm
                </ButtonWarning>
                <ButtonWarning onClick={() => setIsDeleting(false)}>
                  Cancel
                </ButtonWarning>
              </WarningButtonsWrapper>
            </>
          )}
        </CardBodyWrapper>
      </CardStyled>
    </Col>
  );
};

export default CardDisplay;
