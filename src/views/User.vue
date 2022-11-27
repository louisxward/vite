<template>
    <main class="user-page">
        <pageheader header="User"></pageheader>
        <userdetails :id="$route.params.id"/>
    </main>
</template>


<script setup>
    import pageheader from '../components/pageheader.vue'
    import userdetails from '../components/userdetails.vue'
</script>