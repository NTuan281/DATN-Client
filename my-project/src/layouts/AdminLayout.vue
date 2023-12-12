<template>
  <div class="grid grid-cols-12">
    <SideNavDashBoard class="col-span-2" />
    <div class="col-span-10 h-screen overflow-auto">
      <div class="h-16 bg-gray-300 w-full fixed shadow-xl"></div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import SideNavDashBoard from "../components/SideNavDashBoard.vue";
</script>
