<script setup>
import { useUserStore } from '../stores/user'
 import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter();
const userStore = useUserStore()

 const email = ref('')
 const password = ref('')

 const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
        return alert('Por favor, ingresa tu correo electrónico y contraseña.');
    }
  await userStore.registerUser(email.value, password.value)
   /*  router.push('/home') */
 }
</script>

<template>
  <div class="flex h-screen items-center justify-center">
   <div class="h-[600px] w-[400px] border-2 border-solid border-gray-800 px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" 
        alt="Your Company" />
      <h2 class="mt-5 text-center 
        text-2xl/9 font-bold tracking-tight text-gray-900"
        >
        Registrate!
      </h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6" method="POST">
<!-- Email address --> 
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email"
               name="email" 
               id="email"
               autocomplete="email"
               required="true" 
               v-model.trim="email"
               
               class="block w-full rounded-md 
                border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-500 
                placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6" />
          </div>
        </div>
 <!-- Password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input 
             type="password"
             name="password" 
             id="password" 
             autocomplete="current-password" 
             required="true"
              v-model.trim="password"

              class="block w-full rounded-md 
                border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-500 
                placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6" 
               />
          </div>
        </div>

        <div>
          <button 
            type="submit"
            :disabled="userStore.loadingUser"
            class="flex w-full justify-center 
            rounded-md bg-indigo-600 px-3 
            py-1.5 text-sm/6 font-semibold 
            text-white shadow-xs hover:bg-indigo-500 
            focus-visible:outline-2 focus-visible:outline-offset-2
             focus-visible:outline-indigo-600"
            >Crear cuenta
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        ya tienes una cuenta?
        {{ ' ' }}
        <Router-link to="/" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Inicia sesión
        </Router-link>
      </p>

      
    <div class="relative mt-8">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200"></div>
     </div>
     <div class="relative flex justify-center text-sm">
      <span class="bg-white px-2 text-gray-500">
       O continúa con
      </span>
     </div>
    </div>

      
    </div>
  </div>
</div>
</template>

<style></style>

