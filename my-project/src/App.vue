<script setup>
import { RouterView } from 'vue-router'
const generalStore = useGeneralStore()
import AuthOverlay from './components/AuthOverlay.vue'
import { useGeneralStore } from './stores/counter'
</script>

<template>
  <RouterView />
  <AuthOverlay v-if="generalStore.isLoginFormOpen" />
</template>
