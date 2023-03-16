import React from "react";
import { Link, useParams } from "react-router-dom";
import { StSub, StSubBox, StSubBoxText } from "../GlobalStyles";

function Sub({ todos }) {
  const param = useParams();
  const subTodo = todos.find((item) => {
    return item.id === Number(param.id);
  });
  console.log(param);
  return (
    <StSub>
      <StSubBox>
        <Link to="/">메인화면</Link>
        <StSubBoxText> ID:{param.id}</StSubBoxText>
        <StSubBoxText>제목: {subTodo.title}</StSubBoxText>
        <StSubBoxText>내용: {subTodo.content}</StSubBoxText>
      </StSubBox>
    </StSub>
  );
}

export default Sub;
