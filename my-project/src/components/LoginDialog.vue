<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
    <div class="bg-white p-4 rounded shadow-lg text-center">
      <h2 class="text-xl font-bold mb-2">Thông Báo Đăng Nhập</h2>
      <hr class="border-gray-300 my-2" />
      <p class="mb-4">Bạn phải đăng nhập để truy cập vào trang này.</p>
      <button @click="closeDialog" class="bg-blue-500 text-white px-4 py-2 rounded">Đóng</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const closeDialog = () => {
  emit('close')
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
