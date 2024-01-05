<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative bg-white w-full max-w-[470px] h-[70%] p4 rounded-lg">
      <div class="w-full flex justify-end">
        <button class="p-1.5 rounded-full bg-gray-100">
          <XMarkIcon class="w-7 h-7" @click="generalStore.isCreatedAminOpen = false" />
        </button>
      </div>
      <RegisterForm />
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useGeneralStore } from "../stores/generalStore";
import RegisterForm from "./RegisterForm.vue";
const generalStore = useGeneralStore()
</script>
