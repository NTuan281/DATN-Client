<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Account total : {{ listUser.length }}
        </div>
       
      </div>
      <div
        v-for="user in listUser"
        :key="user._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      > 
        <ListUserItem
          :user="user"
        />
      </div>
    </div>
  </AdminLayout>

</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListUserItem from "../components/ListUserItem.vue";
import { useUserStore } from "../stores/userStore";
import Cookies from 'js-cookie'
const listUser = ref([]);
const userStore = useUserStore();
onMounted( async  () => {
  const token = Cookies.get('authToken')
  listUser.value = await  userStore.getAllUser(token)
  console.log(listUser.value);
});

</script>
