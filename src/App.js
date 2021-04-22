import React, { useState, useEffect, useMemo } from "react";
import './App.css';
//import components
import Form from "./components/form";
import TodoList from "./components/todoList";

const saveLocalTodos = (todos) => {
  localStorage.setItem("todos",JSON.stringify(todos));
};
const getLocalTodos = () => {
  if(localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  let  todoLocal = JSON.parse(localStorage.getItem("todos"));
  return todoLocal;
};

function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  
  //USE ONLY ONCE, FOR THE START
  useEffect(()=>{
    setTodos(getLocalTodos());
  }, []);

  //USE EFFECT
  useEffect(() => {
    saveLocalTodos(todos);
  }, [todos]);

  //Functions
  const filteredTodos = useMemo(() => {
    switch (status) {
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      case 'uncompleted':
        return todos.filter(todo => todo.completed === false);
      default:
        return todos;
    }
  },[todos, status]);
  
  return (
    <div className="App">
      <header>
        <h1>React Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList 
        filteredTodos={filteredTodos} 
        todos={todos} 
        setTodos={setTodos} 
      />
    </div>
  );
}

export default App;
