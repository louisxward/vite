<template>
    <div>
        {{userStore.userId}}
        <div class="buttonContainer">
        <button class="actionBtn view-btn" v-if="!$pb.authStore.isValid" @click="authUser">Login</button>
        <button class="actionBtn view-btn" v-if="$pb.authStore.isValid" @click="logoutUser">Log Out</button>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { useUserStore } from '../stores/user';
import { pocketBaseSymbol } from '../symbols/injectionSymbols';
const $pb = inject(pocketBaseSymbol);

const userStore = useUserStore()

const authUser = async () => {
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

const logoutUser = () => {
    userStore.clear();
    $pb.authStore.clear();
}
</script>