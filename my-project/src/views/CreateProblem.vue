<template>
  <AdminLayout>
    <div id="app" class="max-w-2xl mx-auto mt-16">
      <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md">
        <label for="problem" class="block text-sm font-medium text-gray-600">Tên Bài:</label>
        <input v-model="problem" type="text" id="problem" class="mt-1 p-2 border w-full" />
        <label for="difficulty" class="block text-sm font-medium text-gray-600">Độ Khó:</label>
        <select v-model="difficulty" id="difficulty" class="mt-1 p-2 border w-full">
          <option value="Dễ">Dễ</option>
          <option value="Thường">Thường</option>
          <option value="Khó">Khó</option>
        </select>
        <label for="guide" class="block text-sm font-medium text-gray-600">Hưỡng dẫn:</label>
        <input v-model="guide" id="guide" class="mt-1 p-2 border w-full" />
        <label for="description" class="block text-sm font-medium text-gray-600">Mô tả</label>
        <textarea v-model="description" id="description" class="mt-1 p-2 border w-full"></textarea>
        
        <label for="edit" class="block text-sm font-medium text-gray-600">Tên hàm:</label>
        <input v-model="functionName" id="guide" class="mt-1 p-2 border w-full" />
        <label for="return_type" class="block text-sm font-medium text-gray-600"
          >Loại trả về:</label
        >
        <input v-model="returnType" id="guide" class="mt-1 p-2 border w-full" />
        <label class="block text-sm font-medium text-gray-600 mt-2">
          Bài kiểm tra:
          <input type="checkbox" class="ml-4 mt-1 mb-2 p-2 border" v-model="isTest" />
        </label>
        <label for="timeLimit" class="block text-sm font-medium text-gray-600">Time Limit (minutes):</label>
    <input type="number" id="timeLimit" v-model="timeLimit" class="mt-1 p-2 border w-full">
    <input  for="message" class="block text-red-500" v-model="message">
        <button type="submit" class="mt-8 bg-blue-500 text-white px-4 py-2 rounded">Tạo</button>
      </form>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axiosClient from '../api/clientAxiosApi'
import AdminLayout from '../layouts/AdminLayout.vue'
import { useUserStore } from '../stores/userStore'
import Cookies from 'js-cookie'

const userStore = useUserStore()
const description = ref('')
const guide = ref('')
const problem = ref('')
const difficulty = ref('')
const functionName = ref('')
const returnType = ref('')
const isTest = ref(false)
const timeLimit = ref(0)
const message = ref('')

onMounted(() => {})

const submitForm = async () => {
  let user
  const token = Cookies.get('authToken')
  const id = decodeTokenAndGetUserId(token)
  user = await userStore.getUserById(id, token)

  const problemData = {
    name: problem.value,
    difficulty: difficulty.value,
    guide: guide.value,
    description: description.value,
    functionName: functionName.value,
    test: isTest.value,
    returnType: returnType.value,
    user: user,
    timeLimit: timeLimit.value
  }
  console.log(problemData)
  try {
    const response = await axiosClient.post('problem', problemData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    message.value = "Thêm thành công"
  } catch (error) {
    message.value = "Xảy ra lỗi"
    console.error('Error submitting form:', error)
  }
}

function decodeTokenAndGetUserId(token) {
  try {
    if (token) {
      const [, payloadBase64] = token.split('.')
      const decodedPayload = JSON.parse(atob(payloadBase64))

      // Đảm bảo rằng 'role' là một trường có trong payload trước khi truy cập
      if (decodedPayload && decodedPayload.role) {
        return decodedPayload.id
      } else {
        console.error('Trường "id" không tồn tại trong payload.')
        return null
      }
    } else {
      console.error('Token là null hoặc undefined.')
      return null
    }
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error)
    return null
  }
}
</script>

<style>
.selected-tag {
  display: inline-block;
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.close-icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  color: red;
  cursor: pointer;
}
</style>
