<template>
  <div class="text-center text-[28px] mb-4 font-bold">Register</div>
  <div class="px-6 pb-1.5 text-[15px]">Full Name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your full name"
      v-model:input="fullName"
      inputType="text"
      :autoFocus="true"
      :error="errors && errors.name ? errors.name[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Email</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your email"
      v-model:input="email"
      inputType="text"
      :error="errors && errors.password ? errors.password[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">User Name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your user name"
      v-model:input="userName"
      inputType="text"
      :autoFocus="true"
      :error="errors && errors.name ? errors.name[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="password"
      v-model:input="password"
      inputType="password"
      :autoFocus="true"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Confirm Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="confirmPassword"
      inputType="password"
      :autoFocus="true"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Description</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your description"
      v-model:input="description" 
      inputType="text"
    />
  </div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!userName || !password || !confirmPassword || !fullName || !email || !description"
      :class="!userName || !password || !confirmPassword || !fullName || !email || !description ? 'bg-gray-200' : 'bg-[#f02c56]'"
      @click="register()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axiosClient from '../api/clientAxiosApi';
import TextInput from "./TextInput.vue"

const email = ref('');
const password = ref('');
const description = ref('');
const fullName = ref('');
const userName = ref('');
const errors = ref('');
const confirmPassword = ref('');


const register = async () => {
  // Check if any input is empty
  if (email.value === ''){
    errors.email.value = 'Please fill in the field.'
  } else if(password.value === '' ){
    errors.password.value = 'Please fill in the field.'
  } else if(fullName.value === '') {
    errors.fullName.value = 'Please fill in the field.'
  } else if(userName.value === '') {
    errors.value = 'Please fill in the field.';
    return;
  }else if(password.value !== confirmPassword.value){
    errors.description.value = 'Confirm password does not match.';
    return;
  }

  try {
    const signUp = await axiosClient.post("auth/register",{
    username: userName.value,
    password: password.value,
    fullname: fullName.value,
    email: email.value,
    description: description.value,
    role: "USER",
    createAt: new Date
  })
  } catch (error) {
    console.log(error);
  }
  

  
};
</script>
