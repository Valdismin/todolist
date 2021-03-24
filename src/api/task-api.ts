import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': "bc385949-3d41-41a5-85e6-7ba062998611"
    }
})


export const tasksAPI = {
    updateTask(todolistId:string,title:string,taskId:string) {
        const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,
            {title})
        return promise
    },
    deleteTask(taskId:string,todolistId:string) {
        const promise = instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTask(todolistId:string,title:string){
        const promise = instance.post(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    getTask(todolistId:string){
        const promise = instance.get(`todo-lists/${todolistId}/tasks`)
        return promise
    }
}