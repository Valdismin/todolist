import React, {ChangeEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";

type EditableSpanPropsType = {
    value: string
    changeValue: (value: string) => void

}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)
    const activatedEditMode = () => {
        setEditMode(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }
    return editMode ?
        <TextField variant={"outlined"}
                   value={title}
                   onBlur={deActivatedEditMode}
                   autoFocus={true}
                   onChange={onChangeHandler}/>


        : <span onDoubleClick={activatedEditMode}>{props.value}</span>
}