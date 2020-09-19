import styled from "styled-components";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashAlt,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { Row as AntdRow, Col as AntdCol } from "antd";
import { Card, Button as AntdButton, Layout as AntdLayout } from "antd";

const { Footer } = AntdLayout;

export const Input = styled.input`
  padding: 7px;
  width: 250px;
  border-radius: 5px;
  border: 0px;
  margin-bottom: 3rem;
  background-color: white;
`;

export const DateText = styled.span`
  font-weight: bold;
  white-space: nowrap;
`;

export const Box = styled.div`
  background: #f0f2f5;
  color: black;
  width: 100%;
  height: 170px;

  h2,
  h4 {
    color: black;
    margin: 0;
    padding: 10px 10px 10px 0px;
  }
`;

interface ButtonProps {
  isSavedButton?: boolean;
}

export const Button = styled.button<ButtonProps>`
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  align-self: ${({ isSavedButton }) => (isSavedButton ? "center" : "baseline")};
  padding: 7px;
  margin-left: ${({ isSavedButton }) => (isSavedButton ? "3.2rem" : "1rem")};
  margin-bottom: ${({ isSavedButton }) => (isSavedButton ? "4rem" : "auto")};
  background: dodgerblue;
`;

export const ButtonWarning = styled.button`
  color: white;
  background: red;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 5px;
  border-radius: 6px;
  margin-left: 15px;
  cursor: pointer;
  width: 100px;
`;

export const AddTodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodoListWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
`;

export const Ul = styled.ul`
  list-style-type: square;
`;

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: #031529;
  font-size: 18px;
  font-weight: 600;
  color: #f0f2f5;
  padding: 15px 15px 15px 10px;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  border-radius: 20px;
  margin-left: 15px;
`;

export const Check = styled(FAI)`
  margin-left: auto;
  margin-right: 0.8rem;
`;

export const InputWrapper = styled.div`
  display: flex;
`;

export const FooterStyled = styled(Footer)`
  left: 0;
  right: 0;
  position: auto;
  bottom: 0;
  position: fixed;
  text-align: center;  
  font-weight: bold;
  font-family: cursive;
  font-size: large;
  width:100%;
}
`;

export const Row = styled(AntdRow)`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Col = styled(AntdCol)`
  @media (max-width: 480px) {
    display: contents;
  }
  @media (max-width: 768px) {
    display: contents;
  }
`;

export const CardWrapper = styled.div`
  margin-bottom: 5rem;
`;
export const CardBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  margin-top: 5rem;
`;
export const Paragraph = styled.p`
  color: rgb(29 62 99);
  text-align: center;
  font-size: 60px;
  margin-top: 1rem;
  padding: 0 0 20px 0;

  @media (max-width: 480px) {
    font-size: 200px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CardStyled = styled(Card)`
  min-height: 430px;
  max-height: 430px;
  margin-top: 5rem;
  width: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 45px;

  && .ant-card-head {
    border-bottom: 0;
  }

  @media (max-width: 480px) {
    width: auto;
    max-height: none;
    min-height: auto;
  }
  @media (max-width: 768px) {
    width: auto;
    max-height: none;
    min-height: auto;
  }
`;

export const ButtonStyled = styled(AntdButton)`
  margin-top: 1rem;
`;

export const Title = styled.div`
  text-align: center;
  white-space: normal;
  min-height: 120px;

  @media (max-width: 480px) {
    width: auto;
    max-height: 120px;
    min-height: 120px;
  }
  @media (max-width: 768px) {
    width: auto;
    max-height: 120px;
    min-height: 120px;
  }
`;

export const TodoListTitle = styled.h1`
  text-align: center;
`;

export const AlertText = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: bold;
  font-size: 20px;
`;

export const WarningButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
