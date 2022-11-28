<template>
    <div>
        id: {{userStore.userId}}
        <form @submit.prevent="authUser" v-if="!$pb.authStore.isValid">
            <label class="block">
                <span>Email: </span>
                <input type="text" v-model="email">
            </label>
            <label class="block">
                <span>Password: </span>
                <input type="text" v-model="password">
            </label>
            <button type="submit">
                <span>Login</span>
            </button>
        </form>
        <div class="buttonContainer" style="margin-top: 2rem;">
            <button class="actionBtn view-btn" v-if="!$pb.authStore.isValid" @click="authUserDefault">Login Default</button>
            <button class="actionBtn view-btn" v-if="$pb.authStore.isValid" @click="logoutUser">Log Out</button>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useUserStore } from '../stores/user';
import { pocketBaseSymbol } from '../symbols/injectionSymbols';

const $pb = inject(pocketBaseSymbol);

const userStore = useUserStore()

const email = ref("");
const password = ref("");

function authUserDefault(){
    email.value = 'louisxward@gmail.com'
    password.value = "12345"
    authUser()
}

const authUser = async () => {
    try {
        const response = await $pb.collection('users').authWithPassword(email.value, password.value);

        if(response){
            console.log(response)
            userStore.userId = response.record.id;
            userStore.username = response.record.username;
            email.value = ''
            password.value = ''
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