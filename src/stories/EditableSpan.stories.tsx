import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {Button, ButtonProps} from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskType} from "../AppWithRedux";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    args:{

    }
} as Meta;



const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
    value:"default.value",
    changeValue:action("EditableSpan Clicked")
}





