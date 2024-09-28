import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async login(email, password) {
            const response = await axios.post('/login/', { email, password });
            this.token = response.data.token;
            this.user = response.data.user;
            localStorage.setItem('token', this.token);
            return response;
           
        },

        async logout() {
            await axios.post('/logout/', null, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
           
        },

        getters: {
            isAuthenticated: (state) => !!state.token,
        }
    }
})
