<template>
  <div class="app">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script setup>
	import Sidebar from './components/sidebar.vue'


</script>

<style lang="scss">
:root {
	--primary: #FFFF00;
	--primary-alt: #121212;
	--grey: #64748b;
	--lightgrey: #d3d3d3;
	--black: #000000;
	--black-alt: #181818;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
 	font-family: 'Roboto Mono', monospace;
}
body {
	background: var(--black);
}
button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
	color: var(--primary);
}
.warning{
	color:red;
}
.app {
	display: flex;
	main {
		flex: 1 1 0;
		margin: 2rem;
		//padding: 2rem;
		background-color: var(--black);
		border: 1px solid var(--primary);
		//border-radius: 0.5rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
		color: white;
	}
}
</style>