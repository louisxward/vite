<template>
    <div>
        <div v-if="user">
            <div>id: {{userId}}</div>
            <form @submit.prevent="submitUser">
                <label class="block">
                    <span>Name: </span>
                    <input type="text" v-model="user.name">
                </label>
                <label class="block">
                    <span>Email: </span>
                    <input type="email" v-model="user.email">
                </label>
                <button type="submit">
                    <span v-if="userId == 0">Create</span>
                    <span v-else> Update</span>
                </button>
            </form>
        </div>
        <div v-else-if="userNotFound">
            <div class="warning">not found...</div>
        </div>
        <div v-else>
            <div class="warning">loading...</div>
        </div>
    </div>  
</template>


<script>
    import PocketBase from 'pocketbase';
    
    const pb = new PocketBase('http://127.0.0.1:8090');

    export default {
        props: ['id'],
        data () {return {user: null, userId: null, touched: false, userNotFound: false,}
        },
        async mounted () {
            const userId = this.id
            this.userId = userId
            if(userId != 0){
                try{
                    const response = await pb.collection('users').getOne(userId, {});
                    this.user = {name: response.name, email: response.email}
                }
                catch(error){
                    console.log(userId + " userId not found")
                    this.userNotFound = true
                    return ;
                }
                console.log(userId + " userId found")
            }
            else{
                this.user = {name: "", email: ""}
            }
            
        },
        methods: {
            async submitUser(){
                if(this.userId != 0){
                    console.log("update")
                    await pb.collection('users').update(this.userId, this.user);
                }
                else{
                    console.log("create")
                        const record = await pb.collection('users').create(this.user); 
                        console.log(record.id)
                        this.userId = record.id
                        this.$router.push({ path: `/user/${this.userId}` })

                }
            }
        },
    }



</script>



<style>

</style>