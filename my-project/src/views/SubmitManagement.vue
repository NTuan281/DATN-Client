<template>
    <AdminLayout>
        <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Account total : {{ listProblem.length }}
        </div>
       
      </div>
      <div
        v-for="(problem) in listProblem"
        :key="problem._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      > 
        <ListProblemItem
          :problem="problem"
        />
      </div>
    </div>
    </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ListProblemItem from '../components/ListProblemItem.vue'
import AdminLayout from '../layouts/AdminLayout.vue';
import {useProblemStore} from '../stores/problemStore.js'
const problemStore = useProblemStore()
const listProblem = ref([])
onMounted(async()=>{
    try {
      listProblem.value = await problemStore.getAllProblem()
    } catch (error) {
      console.log(error);
    }
    
    
})
</script>