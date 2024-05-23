import React, { useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../toto";
import { FaEdit, FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const TodoList = () => {
  const [todo, setTodo] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>("");

  //handle function

  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };
  const handleEditSave = (id: number) => {
    if (editingTodoText.trim() !== "") {
      const newTodo: TodoTypes = {
        id,
        text: editingTodoText,
        completed: false,
      };
      TodoService.updateTodos(newTodo);
      setTodo((preTodo) =>
        preTodo.map((todo) => (todo.id === id ? newTodo : todo))
      );
      setEditingTodoId(null);
      setEditingTodoText("");
    }
  };
  const handleDeteleToto = (id: number) => {
    TodoService.deleteTodos(id);
    setTodo((preTodo) => preTodo.filter((todo) => todo.id !== id));
  };
  const handleComplete = (id: number) => {
    const newTodo: TodoTypes = {
      id,
      text: todo.find((t) => t.id === id)?.text || "",
      completed: true,
    };
    TodoService.updateTodos(newTodo);
    setTodo((preTodo) =>
      preTodo.map((todo) => (todo.id === id ? newTodo : todo))
    );
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodo} />
        <div className="todos">
          {todo.map((t) => (
            <div
              className={`items ${t.completed ? "bg-green" : ""}`}
              key={t.id}
            >
              {editingTodoId == t.id ? (
                <div className="editText">
                  <input
                    type="text"
                    value={editingTodoText}
                    onChange={(e) => {
                      setEditingTodoText(e.target.value);
                    }}
                    autoFocus={true}
                  />
                  <button onClick={() => handleEditSave(t.id)}>
                    <FaRegCheckCircle />
                  </button>
                  <button onClick={() => handleEditCancel()}>
                    <MdCancel />
                  </button>
                </div>
              ) : (
                <div className={`editBtn `}>
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                    }}
                  >
                    {t.text}
                  </span>
                  <button onClick={() => handleEditStart(t.id, t.text)}>
                    <FaEdit />
                  </button>
                </div>
              )}
              <div>
                <button onClick={() => handleComplete(t.id)}>
                  <IoCheckmarkDoneCircleOutline />
                </button>

                <button onClick={() => handleDeteleToto(t.id)}>
                  <RiDeleteBin5Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
