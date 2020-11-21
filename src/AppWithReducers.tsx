import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveToDoListAC,
    todoListsReducer
} from "./state/todolist-reducer";


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

function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [tasks, dispatchToTask] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'R', isDone: true},
            {id: v1(), title: 'Excel', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Whiskey', isDone: true},
            {id: v1(), title: 'Books', isDone: false},
            {id: v1(), title: 'Fish', isDone: true},
            {id: v1(), title: 'Butter', isDone: false}
        ],

    })

    let [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn?", filter: "all"},
        {id: todoListID2, title: "What to buy?", filter: "all"}
    ])

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatchToTask(action)
    }

    function removeTasks(taskID: string, todoListID: string) {
        const action = removeTaskAC(taskID, todoListID)
        dispatchToTask(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListID)
        dispatchToTask(action)
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskId, title, todoListID)
        dispatchToTask(action)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = ChangeFilterAC(todoListID,value)
        dispatchToTodoList(action)
    }

    function removeToDoList(todoListID: string) {
        const action = RemoveToDoListAC(todoListID)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }


    function changeTodoListTitle(todoListID: string, title: string) {
        const action = ChangeTitleAC(todoListID, title)
        dispatchToTodoList(action)
    }

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
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }

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

export default AppWithReducers


