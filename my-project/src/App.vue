

<template>
  <RouterView />
  <AuthOverlay v-if="generalStore.isLoginFormOpen" />
  <AdminAuthOverlay v-if="generalStore.isCreatedAminOpen" />
  <LoginDialog v-if="generalStore.showLoginDialog" @close="generalStore.showLoginDialog = false" />
</template>
<script setup>
import { RouterView } from 'vue-router'
import AuthOverlay from './components/AuthOverlay.vue'
import { useGeneralStore } from './stores/generalStore.js'
import AdminAuthOverlay from './components/AdminAuthOverlay.vue';
import LoginDialog from './components/LoginDialog.vue'

const generalStore = useGeneralStore()
</script>