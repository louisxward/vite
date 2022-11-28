import  { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
    const userId = ref(useLocalStorage("userId", ""));
    const username = ref(useLocalStorage("username", ""));
    const name = ref(useLocalStorage("name", ""));
    
    function clear() {
        userId.value = "";
        username.value = "";
        name.value = "";
    }
    
    return { userId, username, clear, name }
})