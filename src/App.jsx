import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import Switch from "@mui/material/Switch";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState();

  const AddTodo = () => {
    if (inputValue.trim()) {
      const temp = [...todos, { text: inputValue, completed: false }];
      setTodos(temp);
      setInputValue("");
      localStorage.setItem("todos", JSON.stringify(temp));
    } else {
      alert("Please input todo");
    }
  };

  const DeleteTodo = (index) => {
    const Confirmed = confirm("Are you sure you want to delete this todo?");
    if (Confirmed) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
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
      localStorage.setItem("todos", JSON.stringify(newTodos));
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
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const resetItem = () => {
    setTodos("");
    localStorage.removeItem("todos");
  };
  const titleIcon = () => {
    document.title = `Achieve-Aura (${todos.length})`;
  };

  useEffect(() => {
    titleIcon();
  }, [todos]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todos"));

    if (items) {
      setTodos(items);
    }
  }, []);

  return (
    <Box className="container mt-4">
      <div className="text-center mb-4">
        <h1 style={styles.header}>My To-Do List</h1>
        <TextField
          style={styles.inputField}
          id="filled-basic"
          label="Enter your task"
          variant="standard"
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
            style={styles.button}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={AddTodo}
            style={styles.button}
          >
            Add
          </Button>
        )}
        <Button variant="contained" color="error" onClick={resetItem}>
          Reset
        </Button>
      </div>

      <div
        className="d-flex justify-content-between mb-3"
        style={styles.todoHeader}
      >
        <h3 style={styles.task}>Tasks</h3>
        <h3 style={styles.action}>Actions</h3>
      </div>

      <div style={styles.todoContainer}>
        {todos.length ? (
          <ul className="list-unstyled">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="d-flex align-items-center mb-2 p-2 border-bottom"
                style={styles.todoItem}
              >
                <Checkbox
                  checked={todo.completed}
                  style={styles.checkbox}
                  onChange={() => strike(index)}
                />

                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => editTodo(index)}
                  disabled={todo.completed}
                  style={styles.actionButton}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => DeleteTodo(index)}
                  disabled={todo.completed}
                  style={styles.actionButton}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.p}>No tasks yet! Add a task to get started.</p>
        )}
      </div>
    </Box>
  );
};

const styles = {
  header: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: "40px",
    margin: "25px",
  },
  inputField: {
    width: "400px",
    marginBottom: "25px",
  },
  button: {
    margin: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  todoHeader: {
    borderBottom: "2px solid #ddd",
  },
  todoContainer: {
    maxHeight: "700px",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f0f0f0",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  checkbox: {
    marginRight: "15px",
  },
  todoText: {
    flexGrow: 1,
    fontSize: "18px",
  },
  actionButton: {
    marginRight: "10px",
  },
  p: {
    marginLeft: "400px",
  },
  task: {
    marginLeft: "50px",
  },
  action: {
    marginRight: "100px",
  },
};

export default App;
