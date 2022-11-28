import  { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
    const userId = ref(useLocalStorage("userId", ""));
    const username = ref(useLocalStorage("username", ""));
    
    function clear() {
        userId.value = "";
        username.value = "";
    }
    
    return { userId, username, clear }
})