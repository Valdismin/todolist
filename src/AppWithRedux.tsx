import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveToDoListAC,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType,Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()


    const addTask= useCallback((title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID)
        dispatch(action)
    },[dispatch])
    const removeTasks= useCallback((taskID: string, todoListID: string)=> {
        const action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    },[dispatch])
    const changeStatus= useCallback((taskId: string, isDone: boolean, todoListID: string)=> {
        const action = changeTaskStatusAC(taskId, isDone, todoListID)
        dispatch(action)
    },[dispatch])
    const changeTaskTitle= useCallback((taskId: string, title: string, todoListID: string)=> {
        const action = changeTaskTitleAC(taskId, title, todoListID)
        dispatch(action)
    },[dispatch])
    const changeFilter= useCallback((value: FilterValuesType, todoListID: string)=> {
        const action = ChangeFilterAC(todoListID, value)
        dispatch(action)
    },[dispatch])
    const removeToDoList= useCallback((todoListID: string)=> {
        const action = RemoveToDoListAC(todoListID)
        dispatch(action)

    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    },[dispatch])
    const changeTodoListTitle= useCallback((todoListID: string, title: string)=> {
        const action = ChangeTitleAC(todoListID, title)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id];

                            return (
                                <Grid item={true} key={tl.id}>
                                    <Paper style={{padding: "15px"}} variant={"outlined"} elevation={3}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTasks={removeTasks}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeToDoList={removeToDoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux


