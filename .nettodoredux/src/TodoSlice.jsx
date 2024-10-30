import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    todos: [],
    status: 'idle',
    error: null
};

export const fetchTodos = createAsyncThunk('TodoSlice/fetchTodos', async () => {
    const response = await axios.get('https://localhost:7206/api/Todo');
    return response.data;
});

export const addTodo = createAsyncThunk('TodoSlice/addTodo', async (newTodo) => {
    const response = await axios.post('https://localhost:7206/api/Todo', newTodo);
    return response.data;
});
export const deleteTodo=createAsyncThunk('TodoSlice/deleteTodo',async(id)=>{
    await axios.delete(`https://localhost:7206/api/Todo/delete/${id}`)
    return id
})
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.todos = action.payload; 
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload); 
            })
            .addCase(deleteTodo.fulfilled,(state,action)=>{
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    }
});

export default todoSlice.reducer;
