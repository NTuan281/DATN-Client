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
      placeholder="Confirm Password"
      v-model:input="confirmPassword"
      inputType="password"
      :autoFocus="true"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Description</div>
  <div class="px-6 pb-2 mb-1">
    <TextInput
      placeholder="Your description"
      v-model:input="description" 
      inputType="text"
    />
  </div>
  <span class="text-red-500 font-semibold text-xs flex  justify-center">{{ errorRegister }}</span>
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
<!-- chay server di -->
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
const errorRegister = ref('')


const register = async () => {
  // Kiểm tra nếu bất kỳ trường nào trống
  if (!email.value || !password.value || !confirmPassword.value || !fullName.value || !userName.value || !description.value) {
    errors.value = 'Please fill in all fields.';
    errorRegister.value = 'Please fill in all fields.'
    return;
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errors.email = 'Please enter a valid email address.';
    console.error("Please enter a valid email address.");
    errorRegister.value = 'Please enter a valid email address.';
    return;
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu
  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Confirm password does not match.';
    console.error("Confirm password does not match.");
    errorRegister.value = 'Confirm password does not match.';
    return;
  }

  // Kiểm tra mật khẩu có ký tự đặc biệt, số và ít nhất một chữ hoa
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password.value)) {
    errors.password = 'Password must contain at least 8 characters, including one uppercase letter, one digit, and one special character.';
    console.error("Password must contain at least 8 characters, including one uppercase letter, one digit, and one special character.");
    errorRegister.value = 'Password must contain at least 8 characters, including one uppercase letter, one digit, and one special character.';
    return;
  }

  try {
    // Gọi API đăng ký
    const signUp = await axiosClient.post("auth/register",{
      username: userName.value,
      password: password.value,
      fullname: fullName.value,
      email: email.value,
      description: description.value,
      role: "USER",
      createAt: new Date()
    });
    errorRegister.value = 'Successfully!!';

  } catch (error) {
    console.error(error);
  }
};
</script>
