<template>
    <div class="header">
        <h1>{{ header }}</h1>
    </div>
</template>

<script>
export default {
  props: ['header']
}
</script>

<style lang="scss">
.header {
    border-bottom: 1px solid var(--primary);
    padding: 0.4rem 1rem;
}
</style>