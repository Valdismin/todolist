import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../../api/todolist-api";
import {tasksAPI} from "../../api/task-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoList().then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "JS"
        todolistAPI.createTodoList(title).then((response) => {
            setState(response.data.data.item)
        })
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const  todolistId = 'f15bae5b-3153-4472-9ec6-3956ba1a258e'
        todolistAPI.deleteTodoList(todolistId).then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3f482796-b84c-4bd3-aa8b-91efe0e67aaf'
        const title = "JS"
        todolistAPI.updateTodoList(todolistId,title).then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const  todolistId = '97eef7f6-17ca-43da-a613-d8d9bac0bf15'
        tasksAPI.getTask(todolistId).then((response) => {
            setState(response.data.items)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const  todolistId = '97eef7f6-17ca-43da-a613-d8d9bac0bf15'
        const title = 'HTML'
        tasksAPI.createTask(todolistId,title).then((response) => {
            setState(response.data.data.item)
        })
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const  todolistId = '97eef7f6-17ca-43da-a613-d8d9bac0bf15'
        const  taskId = '62feb077-51bc-4c23-8554-71dc6b0a8cc3'
        tasksAPI.deleteTask(taskId,todolistId).then((response) => {
            setState(response.data)
        })
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '97eef7f6-17ca-43da-a613-d8d9bac0bf15'
        const taskId = '316acc38-4e8f-46a9-b2ef-8374f849250a'
        const title = 'Idiot'
        tasksAPI.updateTask(todolistId,title,taskId).then((response) => {
            setState(response.data.data.item)
        })
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
