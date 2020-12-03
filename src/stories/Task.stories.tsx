import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {Button, ButtonProps} from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskType} from "../AppWithRedux";

export default {
    title: 'Task',
    component: Task
} as Meta;

const removeTaskCallback = action("Remove button inside task clicked")
const changeTaskCallback = action("Change task status")
const changeTitleCallback = action("Change task title")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const doneTaskExample = Template.bind({});

doneTaskExample.args = {
    removeTasks: removeTaskCallback,
    task: {id: '1', title: 'React', isDone:true },
    changeStatus: changeTaskCallback,
    changeTaskTitle: changeTitleCallback,
    todolistID: "todolist"
}

export const isNotDoneTask = Template.bind({});

isNotDoneTask.args = {
    removeTasks: removeTaskCallback,
    task: {id: '1', title: 'React', isDone:false },
    changeStatus: changeTaskCallback,
    changeTaskTitle: changeTitleCallback,
    todolistID: "todolist"
}



