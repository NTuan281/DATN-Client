<template>
  <div class="text-center text-[28px] mb-4 font-bold">Log in</div>
  <div class="px-6 pb-1.5 text-[15px]">User name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="name"
      inputType="text"
      :autoFocus="true"
      
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      
    />

   
  </div>
   <span class="text-red-500 font-semibold text-xs flex  justify-center">{{ errorLogin }}</span>
  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!name || !password"
      :class="!name || !password ? 'bg-gray-200' : 'bg-gray-800'"
      @click="login()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Login
    </button>
    
  <div class="px-6 text-[12px] text-gray-600 mt-10 text-center">Forgot password?</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TextInput from './TextInput.vue'
import { useUserStore } from '../stores/userStore';
import { useGeneralStore } from '../stores/generalStore';
import { useRouter } from 'vue-router'; 
const router =useRouter()
const generalStore = useGeneralStore()
const userStore = useUserStore()
const errorLogin = ref('')
const login = async()=>{
  try {
    await userStore.LoginUser(name.value, password.value) 
    generalStore.isLoginFormOpen = false
    // const token = getToken();
    // const userRole = decodeTokenAndGetUserRole(token);
    // if (userRole === 'ADMIN') {
    //   router.push("/dashboard")
    // } else if (userRole === 'USER') {
    //   router.push("/problems")
    // } else {
    //   router.push("/dashboard")
    // }
    
  } catch (error) {
    console.log("Error : " , error);
    errorLogin.value = error.response.data 
    
  }
}
// const jwt = require('jsonwebtoken');

function decodeTokenAndGetUserRole(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
      return payload.role; // Assuming the role is stored in the 'role' claim
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

function getToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') { 
        return value;
      }
    }
    return null;
  }
  

let name = ref(null)
let password = ref(null)
</script>
