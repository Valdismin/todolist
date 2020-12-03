import React, {ChangeEvent} from "react"
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    removeTasks: (taskID: string, todoListID: string) => void
    task: TaskType
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    todolistID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTasks(props.task.id, props.todolistID)
    }


    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let isDone = e.currentTarget.checked
        props.changeStatus(props.task.id, isDone, props.todolistID)
    }

    const changeTaskTitle = (value: string) => {
        props.changeTaskTitle(props.task.id, value, props.todolistID)
    }
    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditableSpan value={props.task.title} changeValue={changeTaskTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})