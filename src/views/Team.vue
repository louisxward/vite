<template>
    <main class="team-page">
        <pageheader header="Team"></pageheader>
        <usertable ref="usertableRef"/>
        <!-- <actionbuttons/> -->
        <userform @created="refreshTable"/>
    </main>
</template>

<script setup>
    import pageheader from '../components/pageheader.vue'
    import usertable from '../components/usertable.vue'
    import actionbuttons from '../components/actionbuttons.vue'
    import userform from '../components/userform.vue'
    import { ref } from 'vue';

    let refresh = false


    const usertableRef = ref(null);

    function handleCreate() {
      console.log('Child has been created.');
    }



    //recieve emit from userform = created
    //call this method
    //set ref on userform allowing us to access its methods
    //call defaultsearch
    function refreshTable(){
        console.log("refreshTable()")
        refresh = !refresh
        console.log(refresh)
        usertableRef.value.doDefaultSearch()
    }


</script>