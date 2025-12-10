<script setup>
import { useUserStore } from '../stores/user'
 import { RouterLink, useRouter } from 'vue-router'

import { ref } from 'vue'

const router = useRouter();
const userStore = useUserStore()

 const email = ref('')
 const password = ref('')
const confirmPassword = ref('')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


// Validaciones de los campos del formulario para los errores
const errors = ref({
  email: '',
  password: '',
  confirmPassword: '',
})  

const handleSubmit = async () => {
 errors.value = {
    email: '',
    password: '',
    confirmPassword: ''
  }
let isValid =true
if (!email.value) {
  errors.value.email = 'Ingresa un correo'
  isValid = false
} else if (!emailRegex.test(email.value)) {
  errors.value.email = 'Correo no válido'
  isValid = false
}
  if (password.value.length < 6) {
   errors.value.password = 'La contraseñas debe tener al menos 6 caracteres'
    isValid = false
  }
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  }
  if (!isValid) {
    return
  }
  await userStore.registerUser(email.value, password.value)
}
</script>

<template>
  <div class="flex h-screen items-center justify-center">
   <div class="min-h-[600px] w-[400px] border-2 border-solid border-gray-800 px-6 py-12 lg:px-8">
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
      <form @submit.prevent="handleSubmit" class="space-y-6" method="POST" novalidate>
<!-- Email address --> 
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input 
              type="email"
               name="email" 
               id="email"
               autocomplete="email"
               required="true" 
               v-model.trim="email"
               @input="errors.email = ''"

               
               class="block w-full rounded-md 
                border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-500 
                placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6" 
              />
              <p v-if="errors.email" class="mt-1 min-h-[20px] text-sm text-red-600">{{ errors.email }}</p>
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
             v-model.trim="password"
             @input="errors.password = ''"
              class="block w-full rounded-md 
                border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-500 
                placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6" 
               />
               <p v-if="errors.password" class="mt-1 min-h-[20px] text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>
<!-- Confirm Password -->        
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
          </div>
          <div class="mt-2">
            <input 
             type="password"
             name="confirm-password" 
             id="confirm-password" 
             autocomplete="current-password" 
              v-model.trim="confirmPassword"
              @input="errors.confirmPassword = ''"

            class="block w-full rounded-md 
                border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-500 
                placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6" 
               />
               <p v-if="errors.confirmPassword" class="mt-1 min-h-[20px] text-sm text-red-600">{{ errors.confirmPassword }}</p>
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

