const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const EDIT_TODO = 'EDIT_TODO';

export const addTodoAction = (content) => ({ type: ADD_TODO, payload: content });
export const deleteTodoAction = (id) => ({ type: DELETE_TODO, payload: id });
export const toggleTodoAction = (id) => ({ type: TOGGLE_TODO, payload: id });
export const editTodoAction = (id, content) => ({ type: EDIT_TODO, payload: { id, content } });

const todosReducer = (state = [], action) => {
  switch (action.type) {    
    case ADD_TODO:
      return [...state, { id: Math.random(), content: action.payload, isImportant: false }];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id === action.payload ? { ...todo, isImportant: !todo.isImportant } : todo);
    case EDIT_TODO:
      return state.map((todo) => todo.id === action.payload.id ? { ...todo, content: action.payload.content } : todo);
    default:
      return state;
  }
};

export default todosReducer;