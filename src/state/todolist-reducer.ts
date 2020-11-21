import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodoListActionType|AddTodoListActionType|ChangeTitleActionType|ChangeFilterActionType

type RemoveTodoListActionType = {
    type:'REMOVE-TODOLIST',
    id:string
}

type AddTodoListActionType = {
    type:'ADD-TODOLIST',
    title:string,
    todolistId:string
}

type ChangeTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}

type ChangeFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER',
    id:string,
   filter:FilterValuesType
}

let initialState:Array<TodoListType> = []

export const todoListsReducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            const nextState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })
            return nextState

        case 'CHANGE-TODOLIST-FILTER':

            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })
        default:
            return state
    }
}

export const RemoveToDoListAC = (todolistID:string):RemoveTodoListActionType => {
    return {type:'REMOVE-TODOLIST', id:todolistID}
}

export const AddTodoListAC = (title:string):AddTodoListActionType => {
    return {type:'ADD-TODOLIST', title, todolistId :v1()}
}

export const ChangeTitleAC = (todolistID:string,title:string):ChangeTitleActionType => {
    return {type:'CHANGE-TODOLIST-TITLE', id:todolistID,title:title}
}

export const ChangeFilterAC = (todolistID:string,filter:FilterValuesType):ChangeFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER', id:todolistID, filter:filter}
}


