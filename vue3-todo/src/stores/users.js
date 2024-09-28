import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('/login/', { email, password });
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem('token', this.token);
                return response;
            } catch(error) {
                console.log(error)
                throw error;
            }
        },

        async logout() {
            try {
                await axios.post('/logout/', null, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
            } catch(error) {
                console.log(error)
                throw error;
            }
        },

        getters: {
            isAuthenticated: (state) => !!state.token,
        }
    }
})
