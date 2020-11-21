import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button, IconButton} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

type AddItemFormPropsType = {
    addItem:(title:string) => void
}

export function AddItemForm(props:AddItemFormPropsType) {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {onAddTaskClick()}
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                error={!!error}
                label={"Title"}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <IconButton color={"primary"} onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>

        </div>
    )
}