<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';

const router = useRouter();
const route = useRoute();
const databaseStore = useDatabaseStore();

const productName = ref('');
const productPrice = ref('');
const imagenUrl = ref('');

const productId = computed(() => route.params.id);
const isEditing = computed(() => productId.value && productId.value !== 'nuevo');

onMounted(() => {
  if (isEditing.value) {
    const product = databaseStore.documents.find(p => p.id === productId.value);
    
    if (product) {
      productName.value = product.nombre;
      productPrice.value = product.valor;
    } else {
      console.log('Producto no encontrado con id:', productId.value);
    }
  }
});

const handleSubmit = async () => {
  if (!productName.value || !productPrice.value) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    if (isEditing.value) {
      await databaseStore.updateProduct(productId.value, {
        nombre: productName.value,
        valor: parseFloat(productPrice.value),
        imagenUrl: imagenUrl.value
      });
      alert('Producto actualizado exitosamente');
    } else {
      await databaseStore.addProduct({
        nombre: productName.value,
        valor: parseFloat(productPrice.value)
      });
      alert('Producto creado exitosamente');
    }
    router.back();
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar el producto');
  }
};
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {{ isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto' }}
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="productName" class="block text-sm/6 font-medium text-gray-900">
              Nombre del Producto
            </label>
            <div class="mt-2">
              <input 
                v-model="productName"
                id="productName"
                type="text" 
                name="productName"
                required 
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label for="productPrice" class="block text-sm/6 font-medium text-gray-900">
              Precio del Producto
            </label>
            <div class="mt-2">
              <input 
                v-model="productPrice"
                id="productPrice" 
                type="number" 
                name="productPrice"
                step="0.01"
                required 
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> 
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


          <div>
            <button 
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold
               text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-indigo-500">
              {{ isEditing ? 'Actualizar Producto' : 'Agregar Producto' }}
            </button>
          </div>
        </form>
      </div>

      <div class="mt-6 text-center">
        <button 
          @click="router.back()"
          class="text-indigo-500 hover:text-indigo-400 font-semibold">
          Volver
        </button>
      </div>
    </div>
</template>