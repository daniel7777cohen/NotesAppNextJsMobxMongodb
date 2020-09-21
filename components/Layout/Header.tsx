import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { NotesTotal } from "../../styled-components";
import { createGlobalStyle } from "styled-components";
import { config, dom } from "@fortawesome/fontawesome-svg-core";


const Header = ({ totalNotes }: { totalNotes: number }) => {
  return (
    <div>
      <FAI size="2x" cursor={"pointer"} icon={faEnvelope} width={"26"}></FAI>
      <NotesTotal>{totalNotes}</NotesTotal>
    </div>
  );
};

export default Header;
