<script setup>
    import { useUserStore } from '../stores/user'
    
    const userStore = useUserStore();
    
</script>
<template>
    <h1>Home</h1>
    <p>Bienvenido {{ userStore.userData?.email }}</p>
    <button @click="userStore.logoutUser">Cerrar sesión</button>
</template>
<style scoped></style>