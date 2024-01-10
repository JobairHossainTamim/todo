import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./TodoSlice";



const rootReducer = combineReducers({
    todo: TodoSlice

})

const store = configureStore({
    reducer: rootReducer,
})

export default store;