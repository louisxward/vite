<template>
    <main class="user-page">
        <pageheader header="User"></pageheader>
        <div class="content">
            <userdetails :id="$route.params.id"/>
        </div>
    </main>
</template>


<script setup>
    import pageheader from '../components/pageheader.vue'
    import userdetails from '../components/userdetails.vue'
</script>