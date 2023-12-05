<template>
  <div class="text-center text-[28px] mb-4 font-bold">Register</div>
  <div class="px-6 pb-1.5 text-[15px]">Full Name</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Your name"
      v-model:input="name"
      inputType="text"
      :autoFocus="true"
      :error="errors && errors.name ? errors.name[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Email address</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autoFocus="true"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      :error="errors && errors.password ? errors.password[0] : ''"
    />
  </div>
  <div class="px-6 pb-1.5 text-[15px]">Confirm Password</div>
  <div class="px-6 pb-2">
    <TextInput
      placeholder="Confirm Password"
      v-model:input="confirmPassword"
      inputType="password"
      :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''"
    />
  </div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password || !confirmPassword || !name"
      :class="!email || !password || !confirmPassword || !name ? 'bg-gray-200' : 'bg-[#f02c56]'"
      @click="register()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TextInput from './TextInput.vue'
let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)
let name = ref(null)
let errors = ref(null)
</script>
