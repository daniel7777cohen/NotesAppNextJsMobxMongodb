import React from "react";
import {
  AlertText,
  WarningButtonsWrapper,
  ButtonWarning,
} from "../../styled-components";
import { observer } from "mobx-react-lite";
import { DeleteWarningProps } from "../../interfaces";



const DeleteWarning = observer(({
  children,
  handleDelete,
  setIsDeleting,
  noteId,
  index,
}: DeleteWarningProps) => {
  return (
    <>
      <AlertText>Delete Note?</AlertText>
      <WarningButtonsWrapper>
        <ButtonWarning
          onClick={() => {
            handleDelete(noteId, index);
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
  );
});

export default DeleteWarning;
