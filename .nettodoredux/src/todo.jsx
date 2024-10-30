import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos } from './TodoSlice';

export const Todo = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const status = useSelector((state) => state.todos.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [status, dispatch]);

    const hndlDltTodo=(id)=>{
        dispatch(deleteTodo(id))
    }
    const handleAddTodo = () => {
        if (text) {
            dispatch(addTodo( { Task: text, IsCompleted: false })); 
            setText('');
        }
    };
    return (
        <>
            <label htmlFor="textInput">Enter Text:</label>
            <input
                id="textInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type here"
            />
            <button onClick={handleAddTodo}>Submit</button>

            <h3>Todo List:</h3>
            <ul>
                {todos.map((todo, index) => { return(
                   <li style={{color:"red"}} key={index}>{todo.task}<button onClick={(e)=>{
                    e.preventDefault()
                    hndlDltTodo(todo.id)}}>Delete</button></li> )})}
            </ul>
                    </>
    );
};
