<template>
  <!-- Hiển thị thông tin chung -->
    <div class="col-span-2">{{ problem.name }}</div>
    <div class="col-span-2">{{ problem.difficulty }}</div>
    <div class="col-span-2">{{ formatDate(problem.createAt) }}</div>
    <div class="col-span-2">{{ problem.returnType }}</div>
    <div class="col-span-2">{{ problem.functionName}}</div>

    <!-- Hiển thị nút testcase -->
    <div class="col-span-2">
      <button @click="showAddTestCaseModal" class="px-4 py-2 rounded bg-white">
        Thêm Test Case
      </button>
    </div>
  
  <!-- Modal thêm test case -->
  <div
    v-if="isAddTestCaseModalVisible"
    class="fixed inset-0 overflow-y-auto flex items-center justify-center"
  >
    <div class="fixed inset-0 bg-black opacity-50"></div>

    <div class="relative bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-lg font-semibold mb-4">Thêm Test Case</h2>
      <label for="input" class="block text-sm font-medium text-gray-600">Input:</label>
      <input v-model="input" type="text" id="input" class="mt-1 p-2 border w-full" />

      <label for="output" class="block text-sm font-medium text-gray-600">Output:</label>
      <input v-model="output" type="text" id="output" class="mt-1 p-2 border w-full" />
      <!-- Các trường nhập liệu của test case -->

      <div class="mt-4 flex justify-end">
        <button @click="addTestCase" class="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        <button @click="hideAddTestCaseModal" class="ml-2 text-gray-600">Hủy</button>
      </div>
    </div>
  </div>

  <!-- Meseenger Test Case modal -->
  <div
    v-if="isMessengerTestCaseVisible"
    class="fixed inset-0 overflow-y-auto flex items-center justify-center"
  >
    <div class="relative p-4 w-1/4 max-w-3xl max-h-full justify-center">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600 justify-center"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <span class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{{
            testCaseMessenger
          }}</span>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center"
        >
          <button
            @click="hideMessengerTestCaseModal"
            data-modal-hide="default-modal"
            type="button"
            class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { problem } = defineProps(['problem'])
const emits = defineEmits(['deletedUser', 'blockUser', 'unblockUser'])
import { ref } from 'vue'
import { reactive } from 'vue'
import axiosClient from '../api/clientAxiosApi'

const isAddTestCaseModalVisible = ref(false)
const isMessengerTestCaseVisible = ref(false)
let testCaseMessenger = ''
const input = ref('')
const output = ref('')

function hideMessengerTestCaseModal() {
  isMessengerTestCaseVisible.value = false
}

function showMessengerTestCaseModal() {
  isMessengerTestCaseVisible.value = true
}

const newTestCase = reactive({
  input: '',
  output: ''
})

function formatDate(date) {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}

function showAddTestCaseModal() {
  isAddTestCaseModalVisible.value = true
}

function hideAddTestCaseModal() {
  isAddTestCaseModalVisible.value = false
  resetNewTestCase()
}

function resetNewTestCase() {
  newTestCase.input = ''
  newTestCase.output = ''
}

function addTestCase() {
  // Thêm logic để thêm test case vào problem.testCases

  const testcase = {
    inputs: input.value,
    output: output.value,
    problem: { ...problem }
  }
  saveTestCase(testcase)
}

const saveTestCase = async (testCase) => {
  try {
    const response = await axiosClient.post('testcases', testCase)
    // Kiểm tra và xử lý dữ liệu phản hồi nếu cần
    testCaseMessenger = 'Thêm TestCase thành công'
    showMessengerTestCaseModal()
    hideAddTestCaseModal()
  } catch (error) {
    console.error(error)
    // Xử lý lỗi nếu cần
  }
}
</script>
