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
  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>
  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!name || !password"
      :class="!name || !password ? 'bg-gray-200' : 'bg-gray-800'"
      @click="login()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Login
    </button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TextInput from './TextInput.vue'
import { useUserStore } from '../stores/userStore';
import { useGeneralStore } from '../stores/generalStore';
const generalStore = useGeneralStore()
const userStore = useUserStore()
const login = async()=>{
  const logged = await userStore.LoginUser(name.value, password.value) 
  if(logged){
    generalStore.isLoginFormOpen = false
  }
}
let name = ref(null)
let password = ref(null)
</script>
