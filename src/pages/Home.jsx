import React from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import Working from "../components/Working";
import Done from "../components/Done";
import { Stlayout, StMain } from "../GlobalStyles";

function Home({ todos }) {
  return (
    <>
      <Stlayout>
        <Header />
        <Form />
        <StMain>
          <Working todos={todos} />
          <Done todos={todos} />
        </StMain>
      </Stlayout>
    </>
  );
}

export default Home;
