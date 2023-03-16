import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StForm, StFormBtn, StInput, StInputBox } from "../GlobalStyles";
import { __addTodos, __getTodos } from "../redux/modules/todosSlice";

function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(__addTodos({ title, content, isDone: false }));
    await dispatch(__getTodos());
    setTitle("");
    setContent("");
  };
  return (
    <>
      <StForm onSubmit={onSubmitHandler}>
        <StInputBox>
          <span>제목: </span>
          <StInput
            maxLength={15}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <span> 내용: </span>
          <StInput
            maxLength={50}
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </StInputBox>
        <StFormBtn borderColor={"steelblue"} type="submit" value="추가하기">
          추가하기
        </StFormBtn>
      </StForm>
    </>
  );
}

export default Form;
