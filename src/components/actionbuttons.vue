<template>
    <div>
        <div class="buttonBox">
            <button @click="create">Create Bulk</button>
        </div>
        <div class="buttonBox">
            <button @click="create">Create One</button>
        </div>
    </div>
</template>

<script setup>

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
function create(event){ 
    var x = 5
    for(x; x<55; x++){
        console.log(x)
        consolelog(x + "@" + x + ".com")
        pb.collection('users').create({
            name: x,
            email: x + "@" + x + ".com",
        });
    }
}
</script>

<style scoped>
.buttonBox{
    background-color: red;
}

</style>