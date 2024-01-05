<template>
  <div class="col-span-2">{{ problem.name }}</div>
  <div class="col-span-2">{{ problem.difficulty }}</div>
  <div class="col-span-2">{{ problem.createAt }}</div>
  <div class="col-span-2">{{ problem.user.fullName }}</div>

  <div class="flex col-span-1 justify-between"></div>
</template>
<script setup>
const { problem } = defineProps(['problem'])
const emits = defineEmits(['deletedUser', 'blockUser', 'unblockUser'])
function formatDate(date) {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}
console.log(problem)
</script>
