import { StTodoPlace } from "../GlobalStyles";
import TodoBox from "./TodoBox";

function Done({ todos }) {
  return (
    <>
      <h2>Done...</h2>
      <StTodoPlace>
        {todos.map((item) => {
          if (item.isDone === true)
            return (
              <div key={item.id}>
                <TodoBox item={item} />
              </div>
            );
        })}
      </StTodoPlace>
    </>
  );
}

export default Done;
