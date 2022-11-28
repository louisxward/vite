<template>
    
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { pocketBaseSymbol } from '../symbols/injectionSymbols';
import { useUserStore } from '../stores/user';
// Inject the PocketBase client
const $pb = inject(pocketBaseSymbol);

const userStore = useUserStore()

const authUser = async () => {
    console.log("authUser()")
    try {
        const response = await $pb.collection('users').authWithPassword('louisxward@gmail.com','12345',);
        if(response){
            console.log(response)
            userStore.userId = response.record.id;
            userStore.username = response.record.username;
        }   
    } catch(error){
        console.log("erorr")
    }
};

onMounted(() => {
    authUser();
})

</script>