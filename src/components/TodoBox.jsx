import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  StBtn,
  StBtnPlace,
  StInput,
  StSubBtn,
  StTodBoxText,
  StTodoBox,
} from "../GlobalStyles";
import {
  __deleteTodo,
  __getTodos,
  __editTodo,
  __completTodo,
} from "../redux/modules/todosSlice";

function TodoBox({ item }) {
  const id = item.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState(item.title);
  const [editContent, setEditContent] = useState(item.content);
  const [edit, setEdit] = useState(false);
  const titleInput = useRef();
  const contentInput = useRef();

  //삭제
  const onDeleteHandler = async (id) => {
    await dispatch(__deleteTodo(id));
    await dispatch(__getTodos());
  };

  //완료||취소 미완
  const onCompletHandler = async (id, isdone) => {
    await dispatch(__completTodo([id, isdone]));
    await dispatch(__getTodos());
    alert("c");
  };
  //수정
  const onEidthandler = async () => {
    if (editTitle.length < 3 || editTitle.length > 20) {
      alert("제목은 3글자 이상, 20글자 이하입니다!");
      titleInput.current.focus();
      return;
    }

    if (editContent.length < 5 || editContent.length > 100) {
      alert("내용은 5글자 이상, 100글자 이하입니다!");
      contentInput.current.focus();
      return;
    }
    const payload = {
      id: item.id,
      title: editTitle,
      content: editContent,
    };
    await dispatch(__editTodo(payload));
    await dispatch(__getTodos());
    setEdit(!edit);
  };

  return (
    <StTodoBox>
      {!edit ? (
        <div>
          <StSubBtn>
            {/* <Link to={`/sub/${item.id}`}>상세페이지</Link> */}
            <StBtn
              borderColor={"#ffc95f"}
              onClick={() => {
                navigate(`/sub/${item.id}`);
              }}
            >
              상세페이지
            </StBtn>
          </StSubBtn>
          <StTodBoxText>
            <h2 style={{ margin: "0px" }}>{item.title}</h2>
            <span style={{ margin: "20px 0px" }}>{item.content}</span>
          </StTodBoxText>
          <StBtnPlace>
            <StBtn borderColor={"#ff7c92"} onClick={() => onDeleteHandler(id)}>
              삭제하기
            </StBtn>
            <StBtn borderColor={"#83c671"} onClick={onCompletHandler}>
              {item.isDone ? "취소" : "완료"}
            </StBtn>
            <StBtn
              borderColor={"#5fc4ff"}
              onClick={() => {
                setEdit(!edit);
              }}
            >
              수정하기
            </StBtn>
          </StBtnPlace>
        </div>
      ) : (
        <div>
          <div>
            제목 :
            <StInput
              maxLength={15}
              type="text"
              value={editTitle}
              ref={titleInput}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
          </div>
          <div>
            내용 :
            <StInput
              maxLength={50}
              style={{ margin: "20px 0px" }}
              type="text"
              value={editContent}
              ref={contentInput}
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            />
          </div>
          <div>
            <StBtn borderColor={"#5fc4ff"} onClick={onEidthandler}>
              수정완료
            </StBtn>
          </div>
        </div>
      )}
    </StTodoBox>
  );
}

export default TodoBox;
