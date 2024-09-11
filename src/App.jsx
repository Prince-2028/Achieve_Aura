import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState();

  const AddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    } else {
      alert("Please input todo");
    }
  };

  const DeleteTodo = (index) => {
    const Confirmed = confirm("Are you sure you to delete todo?");
    if (Confirmed) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  const editTodo = (index) => {
    setInputValue(todos[index].text);
    setIndexValue(index);
  };

  const updateTodo = (index) => {
    if (inputValue.trim()) {
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], text: inputValue };
      setTodos(newTodos);
      setInputValue("");
      setIndexValue(undefined);
    } else {
      alert("Please input todo");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      AddTodo();
    }
  };

  const strike = (index) => {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    };
    setTodos(newTodos);
  };

  return (
    <>
      <Box className="container mt-4">
        <div className="text-center p-3">
          <h1 style={{ margin: "25px" }}>Todos List</h1>
          <TextField
            style={{ margin: "25px" }}
            id="filled-basic"
            label="Enter your todo"
            variant="filled"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          {indexValue !== undefined ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateTodo(indexValue)}
              style={{
                margin: "35px 10px",
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={AddTodo}
              style={{
                margin: "30px",
              }}
            >
              Add
            </Button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "30%",
          }}
        >
          <h3>Done</h3>
          <h3>Todo items</h3>
          <h3 style={{ marginLeft: "160px" }}>Actions</h3>
        </div>
        <div className="text-center mt-4">
          {todos.length ? (
            <ul className="list-unstyled">
              {todos.map((todo, index) => (
                <li key={index} className="d-flex align-items-center ">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => strike(index)}
                  />
                  <span
                    className="text-start"
                    style={{
                      width: "60%",
                      marginLeft: "500px",
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>

                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      margin: "15px",
                    }}
                    onClick={() => editTodo(index)}
                    disabled={todo.completed}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => DeleteTodo(index)}
                    disabled={todo.completed}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>There are no tasks available...please add your todo</p>
          )}
        </div>
      </Box>
    </>
  );
};

export default App;
