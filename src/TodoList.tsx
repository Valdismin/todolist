import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Task} from "./Task";

export type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTasks: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeToDoList: (taskId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

    const AddTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props])

    const onAllClick = useCallback(() => props.changeFilter("all", props.id), [props])
    const onActiveClick = useCallback(() => props.changeFilter("active", props.id), [props])
    const onCompletedClick = useCallback(() => props.changeFilter("completed", props.id), [props])

    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }


    return (
        <div>
            <h3><EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={() => {
                    props.removeToDoList(props.id)
                }}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={AddTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {tasksForTodoList.map(t => {
                    return <Task key={t.id} todolistID={props.id} removeTasks={props.removeTasks} task={t}
                                 changeStatus={props.changeStatus} changeTaskTitle={props.changeTaskTitle}/>
                })}
            </ul>
            <div>
                <Button size={"small"}
                        color={props.filter === "all" ? "primary" : "default"}
                        variant={"contained"}
                        onClick={onAllClick}>All
                </Button>
                <Button size={"small"}
                        variant={"contained"}
                        color={props.filter === "active" ? "primary" : "default"}
                        onClick={onActiveClick}>Active
                </Button>
                <Button size={"small"}
                        variant={"contained"}
                        color={props.filter === "completed" ? "primary" : "default"}
                        onClick={onCompletedClick}>Completed
                </Button>
            </div>
        </div>
    )
})