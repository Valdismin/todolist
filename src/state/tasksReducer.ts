import {TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAC, RemoveToDoListAC} from "./todolist-reducer";

type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveToDoListAC>

let initialState:TasksStateType = {}

export const tasksReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            let newTask: TaskType = {id: action.taskId, title: action.title, isDone: false}
            const tasksCopy = [newTask, ...tasks]
            stateCopy[action.todoListID] = tasksCopy
            return stateCopy
        }
        case 'CHANGE-STATUS': {
            let stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            const tasksCopy = tasks.map(t => {
                if (t.id === action.taskId) {
                    return {...t, isDone: action.isDone}
                } else {
                    return t
                }
            })
            stateCopy[action.todoListID] = tasksCopy
            return stateCopy

            /*return {...state,[action.todoListID]:state[action.todoListID]
                    .map(t => t.id !== action.taskId ? t : {...t, isDone:action.isDone})}*/
        }
        case 'CHANGE-TITLE': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id !== action.taskId ? t : {...t, title: action.title})
            }
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state}

            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistID} as const
}
export const addTaskAC = (title: string, todoListID: string) => {
    return {type: 'ADD-TASK', title, todoListID, taskId: v1()} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string) => {
    return {type: 'CHANGE-STATUS', isDone, todoListID, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string) => {
    return {type: 'CHANGE-TITLE', todoListID, taskId, title} as const
}

