<template>
    <div>
        <div class="info" v-if="$pb.authStore.isValid">
            id: {{userStore.userId}}
            <br/>
            name: {{userStore.name}}
        </div>
        <div class="loginProfilePicutre" v-if="userStore.pp != ''">
            <img :src="userStore.pp"/>
        </div>
        <div class="formContainer">
            <form @submit.prevent="authUser" v-if="!$pb.authStore.isValid">
                <label class="block">
                    <span>Email: </span>
                    <input type="text" v-model="email">
                </label>
                <label class="block">
                    <span>Password: </span>
                    <input type="password" v-model="password">
                </label>
                <button class="actionBtn" type="submit">
                    <span>Login</span>
                </button>
            </form>
        </div>  
        <div class="buttonContainer" style="margin-top: 2rem;">
            <button class="actionBtn" v-if="!$pb.authStore.isValid" @click="authUserDefault">Login Default</button>
            <button class="actionBtn" v-if="$pb.authStore.isValid" @click="logoutUser">Log Out</button>
        </div>
    </div>
</template>

<style scoped>
.info{
    display: inline-block;
}
.loginProfilePicutre{
	display: inline-block;
    float: right;
}
.loginProfilePicutre img{
	height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
}
</style>

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
            console.log("login " + response.record.id)
            userStore.userId = response.record.id;
            userStore.username = response.record.username;
            userStore.name = response.record.name
            if(response.record.avatar != ""){
                const url = $pb.getFileUrl(response.record, response.record.avatar, {})
                userStore.pp = url
                console.log(userStore.pp)
            }
            email.value = ''
            password.value = ''
        }   
    } catch(error){
        console.log("erorr")
    }
};


const logoutUser = () => {
    console.log("logout " + userStore.userId)
    userStore.clear();
    $pb.authStore.clear();
}
</script>