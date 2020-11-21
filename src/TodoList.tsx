import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

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

export function TodoList(props: PropsType) {

    const tasks =
        props.tasks.map(t => {
            const onClickHandler = () => {
                props.removeTasks(t.id, props.id)
            }


            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }

            const changeTaskTitle = (value: string) => {
                props.changeTaskTitle(t.id, value, props.id)
            }

            return (
                <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        checked={t.isDone}
                        onChange={changeStatus}
                    />
                    <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                    <IconButton onClick={onClickHandler}>
                        <Delete/>
                    </IconButton>
                </li>
            )
        })

    const AddTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }
    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)

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
            <ul style={{listStyle:"none",paddingLeft:"0px"}}>
                {tasks}
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
}