<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-full max-w-[470px] h-[70%] p4 rounded-lg">
      <div class="w-full flex justify-end">
        <button
          class="p-1.5 m-2 rounded-full hover:bg-gray-200 hover:scale-105 duration-300 shadow-md active:scale-75"
        >
          <XMarkIcon class="w-7 h-7" @click="generalStore.isLoginFormOpen = false" />
        </button>
      </div>
      <Login v-if="isRegister" />
      <Register v-else />
      <div class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span class="text-[14px] text-gray-600">Don't have an account?</span>
        <button @click="isRegister = !isRegister" class="text-[14px] font-semibold pl-1">
          <span v-if="isRegister">Sign up</span><span v-else>Login</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useGeneralStore } from '../stores/generalStore.js'
import { ref } from 'vue'
import Login from './LoginForm.vue'
import Register from './RegisterForm.vue'
const generalStore = useGeneralStore()
const isRegister = ref(true)
</script>
