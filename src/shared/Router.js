import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Sub from "../pages/Sub";
import { __getTodos } from "../redux/modules/todosSlice";

const Router = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  console.log(todos);
  if (isLoading) {
    return <div> 로딩 중... </div>;
  }
  if (error) {
    return <div> {error.message}</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home todos={todos} />} />
        <Route path="sub/:id" element={<Sub todos={todos} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
