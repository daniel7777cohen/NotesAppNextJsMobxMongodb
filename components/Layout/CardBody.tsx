import React, { useContext } from "react";
import { DateText, IconWrapper, AlertText } from "../../styled-components";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { observer, MobXProviderContext } from "mobx-react";
import moment from "moment";
import { Note, CardBodyProps } from "../../interfaces";

const CardBody = observer(
  ({ note, isDeleting, setIsDeleting }: CardBodyProps) => {
    const {
      notesStore: { getRecentUpdateDate, getUnDoneTodos },
    } = useContext(MobXProviderContext);

    const undoneTodos = getUnDoneTodos(note);

    const getDate = (dateType: string, note: Note) => {
      return moment
        .unix(
          dateType === "createdAt" ? note.createdAt : getRecentUpdateDate(note)
        )
        .format("MM/DD/YYYY hh:mm A");
    };

    return (
      <>
        <DateText>created : {getDate("createdAt", note)}</DateText> <br />
        <DateText>updated : {getDate("updatedAt", note)}</DateText>
        <AlertText>
          you have{" "}
          {undoneTodos > 1 ? ` ${undoneTodos} todos ` : `${undoneTodos} todo `}
          left
        </AlertText>
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
      </>
    );
  }
);

export default CardBody;
