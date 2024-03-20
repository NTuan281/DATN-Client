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
import VueCookies from 'vue-cookies';

const router =useRouter()
const generalStore = useGeneralStore()
const userStore = useUserStore()
const errorLogin = ref('')


import axios from 'axios';

// Tạo một instance Axios với interceptors
const axiosInstance = axios.create();

// Thêm interceptor để tự động thêm token vào header "Authorization"
axiosInstance.interceptors.request.use(
  config => {
    const token = VueCookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



const login = async()=>{
try {
    const token = await userStore.LoginUser(name.value, password.value);
    generalStore.isLoginFormOpen = false;
    VueCookies.set('authToken', token, '1h'); // '1h' là thời gian sống của cookie (1 giờ)
    const role = decodeTokenAndGetUserRole(token)
    console.log(role);
    if(role === "ADMIN")
      router.push('dashboard')
    else
      router.push('problems')
} catch (error) {
    errorLogin.value = error.response ? error.response.data : 'Đã xảy ra lỗi';
}

}
// const jwt = require('jsonwebtoken');

function decodeTokenAndGetUserRole(token) {
    try {
        if (token) {
            const [, payloadBase64] = token.split('.');
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // Đảm bảo rằng 'role' là một trường có trong payload trước khi truy cập
            if (decodedPayload && decodedPayload.role) {
                return decodedPayload.role;
            } else {
                console.error('Trường "role" không tồn tại trong payload.');
                return null;
            }
        } else {
            console.error('Token là null hoặc undefined.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
        return null;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


let name = ref(null)
let password = ref(null)
</script>
