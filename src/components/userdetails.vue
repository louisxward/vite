<template>
    <div v-if="userFound">
        <form @submit.prevent="submitUser">
            <label class="block">
                <span>Name: </span>
                <input type="text" v-model="name">
            </label>
            <label class="block">
                <span>Email: </span>
                <input type="email" v-model="email">
            </label>
            <button type="submit">
                <span v-if="userId == 0">Create</span>
                <span v-else> Update</span>
            </button>
        </form>
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

var name = ref("");
var email = ref("");


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
    loading.value = false
    userFound.value = true
}

const loadUser = async () => {
    try{
        const response = await $pb.collection('users').getOne(userId.value, {});
        if(response){
            console.log(userId.value + " userId found")
            name = response.name;
            email = response.email
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
        name: name.value,
        email: email.value,
    }
    if(userId.value != 0){
        console.log("update")
        await $pb.collection('users').update(userId, submitUser);
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