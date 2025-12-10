<script setup>
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../stores/user'
    import { useDatabaseStore } from '@/stores/database';

    import Navbar from '../components/Navbar.vue';
   

    const router = useRouter();
    const userStore = useUserStore();
 
    const databaseStore = useDatabaseStore();
    
    databaseStore.getProducts();
</script>

<template>
    <Navbar />
    <h1>Home</h1>
    <p>Bienvenido {{ userStore.userData?.email }}</p>
    <p v-if="databaseStore.loadingDoc">Cargando...</p>
    <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="product in databaseStore.documents" :key="product.id"
            class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between">
            <!-- Info del producto -->
            <div>
                <h3 class="text-lg font-semibold text-gray-900">
                    {{ product.nombre }}
                </h3>
                <p class="text-gray-600 mt-1">
                    💲{{ Number(product.valor).toLocaleString() }}
                </p>
                <img
  :src="product.imagenUrl"
  alt="producto"
  class="w-full h-56 object-cover rounded-t-lg"
/>
            </div>

            <!-- Acciones -->
            <div class="mt-4 flex gap-2">
                <button @click="router.push({ name: 'editar', params: { id: product.id } })"
                    class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded">
                    Editar
                </button>

                <button @click="databaseStore.deleteProduct(product.id)"
                    class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded">
                    Eliminar
                </button>
            </div>
        </li>
    </ul>

</template>