import { StTodoPlace } from "../GlobalStyles";
import TodoBox from "./TodoBox";

function Working({ todos }) {
  return (
    <>
      <h2>Working...</h2>
      <StTodoPlace>
        {todos.map((item) => {
          if (item.isDone === false)
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

export default Working;
