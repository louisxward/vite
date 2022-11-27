<template>
    <form @submit.prevent="createUser">
            <label class="block">
                <span>Name: </span>
                <input type="text" v-model="name">
            </label>
            <label class="block">
                <span>Email: </span>
                <input type="email" v-model="email">
            </label>
        <button type="submit" class="">Create</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const email = ref("");
const name = ref("");

const emit= defineEmits(["created"])

// Function to create a new user
const createUser = async () => {
    try {
        const data = {name: name.value, email: email.value,};
        //const data = {name: name.value, email: name.value + "@" + name.value + ".com",};
        console.log(data)
        const user = await pb.collection('users').create(data)
        emit("created", "true")
        
    } catch (error) {
        console.log("error")
    }
};
</script>

<style>

</style>