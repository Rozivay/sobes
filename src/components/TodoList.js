import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodoAction, deleteTodoAction, toggleTodoAction, editTodoAction } from '../reducers/todos';
import './TodoList.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task.trim()) return;

    if (!isEditing) {
      dispatch(addTodoAction(task));
      setTask('');
    }
  };

  const handleEdit = (id, content) => {
    setTask(content);
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleSave = () => {
    dispatch(editTodoAction(currentId, task));
    setIsEditing(false);
    setCurrentId(null);
    setTask('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTask('');
  };

 
  const sortedTodos = [...todos].sort((a, b) => b.isImportant - a.isImportant);

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit} className="todo-form">
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button type="submit">{isEditing ? 'Save' : 'Add'}</button>
      </form>
      <div className="todo-items">
        <ul>
          {sortedTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span style={{ color: todo.isImportant ? 'red' : 'black' }}>{todo.content}</span>
              <div className="buttons">
                <button onClick={() => dispatch(deleteTodoAction(todo.id))}>Delete</button>
                <button onClick={() => dispatch(toggleTodoAction(todo.id))}>{todo.isImportant ? 'Unmark ' : 'Mark as Important'}</button>
                <button onClick={() => handleEdit(todo.id, todo.content)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <input value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;