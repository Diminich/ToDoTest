import axios from 'axios';

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {"API-KEY": "3af6bfa5-65e5-4eec-88f6-fc8f87e12121"}
});

export const api = {
    getTasks () {
        return instance.get("/todo-lists")
    },

    addNewTask (titleTask) {
        return instance.post("/todo-lists", {title: titleTask})
    },

    deleteTask (id) {
        return instance.delete(`/todo-lists/${id}`)
    },

    updateTitleTask (id, newTitleTask) {
        return instance.put(`/todo-lists/${id}`, {title: newTitleTask})
    },

    login (email, password) {
        return instance.post(`/auth/login`, {email, password})
    }
}

api.login( 'free@samuraijs.com', 'free')