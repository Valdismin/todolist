import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
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

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn?", filter: "all"},
        {id: todoListID2, title: "What to buy?", filter: "all"}
    ])

    function addTask(title: string, todoListID: string) {
        let todolistTasks = tasks[todoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTasks(taskID: string, todoListID: string) {
        let todolistTasks = tasks[todoListID]
        tasks[todoListID] = todolistTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let todolistTasks = tasks[todoListID]

        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const toDoListTasks = tasks[todoListID]
        const task = toDoListTasks.find(task => task.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeToDoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }



    function changeTodoListTitle(todoListID: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)

        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
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
                <Grid container style={{padding:"15px"}}>
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
                                    <Paper style={{padding:"15px"}} variant={"outlined"} elevation={3}>
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

export default App


