<script setup>
import { ref } from 'vue';
import { useDatabaseStore } from '../stores/database';
import router from '@/router';

const databaseStore = useDatabaseStore();
const productName = ref('');
const productValue = ref('');
const imagenUrl = ref('');

const handleSubmit = () => {
    const product = {
        nombre: productName.value,
        valor: parseFloat(productValue.value),
        imagenUrl: imagenUrl.value
    }
    databaseStore.addProduct(product);
    router.back();
    // Limpiar los campos después de enviar
    productName.value = '';
    productValue.value = '';
    imagenUrl.value = '';
}
</script>

<template>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" />
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      Agrega un nuevo producto
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent="handleSubmit" method="POST" class="space-y-6">
      <!-- nombre del producto -->
      <div>
        <label for="productName" class="block text-sm/6 font-medium text-gray-900">Nombre del Producto</label>
        <div class="mt-2">
          <input 
            id="productName"
            type="text" 
            name="productName"
            required 
            autocomplete="productName" 
            v-model="productName"
            class="block w-full rounded-md 
                  border-0 py-1.5 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-500 
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6" />
        </div>
      </div>

      <!-- precio del producto -->
      <div>
        <div class="flex items-center justify-between">
          <label for="productPrice" class="block text-sm/6 font-medium text-gray-900">Precio del Producto</label>
        </div>
        <div class="mt-2">
          <input 
            id="productPrice" 
            type="number" 
            name="productPrice"   
            autocomplete="current-password" 
            v-model="productValue"
            class="block w-full rounded-md 
                  border-0 py-1.5 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-500 
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6" /> 
        </div>
      </div>

      <!-- Select para elegir imagen -->
      <div>
        <label for="imagen" class="block text-sm/6 font-medium text-gray-900">Selecciona una imagen</label>
        <div class="mt-2">
          <select 
            id="imagen"
            v-model="imagenUrl" 
            required
            class="block w-full rounded-md 
                  border-0 py-1.5 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-500 
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6">
            <option value="">-- Selecciona una imagen --</option>
            <option value="/productos/ropa-deportiva.jpeg">Conjunto</option>
            <option value="/productos/medias.jpeg">Medias</option>
            <option value="/productos/pijama.jpeg">Pijama</option>
            <option value="/productos/camiseta.jpeg">Camiseta</option>
            <option value="/productos/tangas.jpeg">Tangas</option>
          </select>
        </div>
      </div>

      <!-- Botón enviar -->
      <div>
        <button 
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5
            text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Agregar Producto
        </button>
      </div>
    </form>
  </div>

  <!-- Botón volver -->
  <div class="mt-6 text-center">
    <button 
      @click="router.back()"
      class="text-indigo-500 hover:text-indigo-400 font-semibold">
      Volver
    </button>
  </div>
</div>
</template>

<style scoped>
</style>