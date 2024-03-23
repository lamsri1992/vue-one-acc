import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: () => {
        return {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
            isLoggedIn: localStorage.getItem('user') ? true : false
        }
    },
    actions: {
        setUser() {
            this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        },
        setIslogin() {
            this.isLoggedIn = localStorage.getItem('user') ? true : false
        }
    }
})