import styled from "styled-components";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashAlt,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  overflow-y: auto;
  cursor: pointer;
`;

const Ul = styled.ul`
  list-style-type: square;
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: lightgrey;
  font-size: 18px;
  font-weight: 600;
  color: black;
  padding: 15px 15px 15px 10px;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
`;

const Check = styled(FAI)`
  margin-left: auto;
  margin-right: 0.8rem;
`;

const TodoList = ({ handleRemoveTodo, todos }) => {
  return (
    <Wrapper>
      <Ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <ItemWrapper>
                <div>{todo.item}</div>
                {/* <Check icon={faCheck}></Check> */}
                <FAI
                  icon={faTrashAlt}
                  onClick={() => {
                    handleRemoveTodo(index);
                  }}
                ></FAI>
              </ItemWrapper>
            </li>
          );
        })}
      </Ul>
    </Wrapper>
  );
};

export default TodoList;
