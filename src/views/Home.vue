<script setup>
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../stores/user'
    import { useDatabaseStore } from '@/stores/database';
    import ProductForm from '../components/ProductForm.vue';
    import Navbar from '../components/Navbar.vue';

    const router = useRouter();
    const userStore = useUserStore();
    const databaseStore = useDatabaseStore();
    
    databaseStore.getProducts();
</script>

<template>
    <Navbar/>   
    <h1>Home</h1>
    <p>Bienvenido {{ userStore.userData?.email }}</p>
    <p v-if="databaseStore.loadingDoc">Cargando...</p>
    <ul v-else>
        <li v-for="product in databaseStore.documents" :key="product.id" class="mb-4">
            {{ product.nombre }} - {{ product.valor }}
            <button
             @click="databaseStore.deleteProduct(product.id)" 
             class="bg-red-400 text-white px-2 py-1 rounded ml-2">
                Eliminar
            </button>
            <button 
             @click="router.push({ name: 'editar', params: { id: product.id } })" 
             class="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                Editar
            </button>
        </li>
    </ul>

    <product-form></product-form>

    <button @click="userStore.logoutUser" class="bg-yellow-500 text-white px-4 py-2 rounded mt-4">
        Cerrar sesión
    </button>
</template>