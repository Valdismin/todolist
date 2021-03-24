import axios from "axios";

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': "bc385949-3d41-41a5-85e6-7ba062998611"
    }
})


export const todolistAPI = {
    updateTodoList(todolistId:string,title:string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`,
            {title})
        return promise
    },
    deleteTodoList(todolistId:string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },
    createTodoList(title:string){
        const promise = instance.post<ResponseType<{item:TodolistType}>>('todo-lists', {title})
        return promise
    },
    getTodoList(){
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    }
}