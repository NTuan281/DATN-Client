

<template>
  <RouterView />
  <AuthOverlay v-if="generalStore.isLoginFormOpen" />
  <AdminAuthOverlay v-if="generalStore.isCreatedAminOpen" />
</template>
<script setup>
import { RouterView } from 'vue-router'
const generalStore = useGeneralStore()
import AuthOverlay from './components/AuthOverlay.vue'
import { useGeneralStore } from './stores/generalStore.js'
import AdminAuthOverlay from './components/AdminAuthOverlay.vue';
</script>