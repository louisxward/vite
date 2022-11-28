<template>
    <div v-if="userFound">
        <div class="info">
            id: {{userId}}
        </div>
        <div class="formContainer">
            <form @submit.prevent="submitUser">
                <label class="block">
                    <span>Name: </span>
                    <input type="text" v-model="name">
                </label>
                <label class="block">
                    <span>Email: </span>
                    <input type="email" v-model="email" v-if="userId == 0">
                    <span v-else-if="userId != 0">{{email}}</span>
                </label>
                <label class="block"  v-if="userId == 0">
                    <span>Password: </span>
                    <input type="text" v-model="password">
                </label>
                <button class="actionBtn" type="submit">
                    <span v-if="userId == 0">Create</span>
                    <span v-else> Update</span>
                </button>
            </form>
        </div>
    </div>
    <div v-else-if="loading">
        loading...
    </div>
    <div v-else>
        not found...
    </div>
</template>


<script setup>
import { inject, onMounted, ref ,} from 'vue';
import { pocketBaseSymbol } from '../symbols/injectionSymbols';
import { useRouter } from 'vue-router';


const $pb = inject(pocketBaseSymbol);

const props = defineProps({
  id: String
})

const userId = ref(props.id);

const router = useRouter();
const emit = defineEmits(["userUpdated"]);

const loading = ref(true)
const userFound = ref(false)

const name = ref("");
const email = ref("");
const password = ref("");


const init = async () => {
    if(userId.value != 0){
        loadUser()
    }
    else{
        createUser()
    }
}

function createUser(){
    name.value = ""
    email.value = ""
    password.value = ""
    loading.value = false
    userFound.value = true
}

const loadUser = async () => {
    try{
        const response = await $pb.collection('users').getOne(userId.value, {});
        if(response){
            console.log(userId.value + " userId found")
            name.value = response.name;
            email.value = response.email
            loading.value = false
            userFound.value = true
        }
    } catch(error){
        console.log(userId.value + " userId not found")
        loading.value = false
    } 
}


async function submitUser(){
    const submitUser = {
        "email": email.value,
        "emailVisibility": true,
        "password": password.value,
        "passwordConfirm": password.value,
        "name": name.value,
    }
    if(userId.value != 0){
        console.log("update")
        await $pb.collection('users').update(userId.value, submitUser);
    }
    else{
        console.log("create")
        const record = await $pb.collection('users').create(submitUser); 
        userId.value = record.id
        router.push("/user/"+userId.value)
    }
}



onMounted(() => {
    init();
})
</script>



<style>

</style>