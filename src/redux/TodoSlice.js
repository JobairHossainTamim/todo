import { createSlice } from "@reduxjs/toolkit";
import { todoData } from "../utils/Data";

const TodoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: localStorage.getItem("todoData")
            ? JSON.parse(localStorage.getItem("todoData"))
            : todoData,
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            saveToLocalStorage(state.todos);
        },
        updateTodo: (state, action) => {
            const { id, updatedTodo } = action.payload;
            const index = state.todos.findIndex((todo) => todo.id === id);
            if (index !== -1) {
                state.todos[index] = updatedTodo;
                saveToLocalStorage(state.todos);
            }
        },

        deleteTodo: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== id);
            saveToLocalStorage(state.todos);
        },
    }
})



const saveToLocalStorage = (data) => {
    localStorage.setItem('todoData', JSON.stringify(data));
};

export const { addTodo, updateTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;

