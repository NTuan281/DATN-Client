<template>
  <div class="bg-slate-200 h-screen">
    <div class="flex px-4 py-2 items-center justify-between">
      <div class="flex items-center">
        <!-- SVG and Problem List Header -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M13 10a1 1 0 011 1v7a1 1 0 11-2 0v-7a1 1 0 011-1zM6 7a1 1 0 011 1v10a1 1 0 11-2 0V8a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-semibold ml-2 cursor-pointer" @click="showProblemList = true"
          >Problem List</span
        >
        <!-- Buttons for navigating problems -->
        <button @click="prevProblem" class="w-8 h-8 text-gray-500 ml-2">&lt;</button>
        <button @click="nextProblem" class="w-8 h-8 text-gray-500 ml-2">&gt;</button>
      </div>
      <div>
        <button class="flex hover:bg-slate-300 px-3 py-1 rounded-md" @click="backToHome">
          <ArrowUturnLeftIcon class="w-6 h-6 text-gray-500" />
          <span class="font-semibold ml-2">Back to home</span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-10 w-full h-[90vh]">
      <div id="problemContent" class="col-span-5 bg-slate-100 mx-4 mr-0 p-4 h-full rounded-md">
        <!-- Problem Content -->
        <div v-if="selectedProblem && testcaseValue" class="p-3">
          <h1 class="font-semibold text-3xl mb-4">
            {{ selectedProblem.id + '. ' + selectedProblem.name }}
          </h1>
          <p :class="difficultyClass(selectedProblem.difficulty)">
            {{ selectedProblem.difficulty }}
          </p>
          <div>
            <h1 class="font-semibold text-2xl mt-6 mb-4">Mô tả yêu cầu</h1>
            <p class="text-lg mt-4">{{ selectedProblem.description }}</p>
          </div>
          <div>
            <h1 class="font-semibold text-2xl mt-6 mb-4">Hưỡng dẫn</h1>
            <p class="text-lg mt-4">{{ selectedProblem.guide }}</p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-semibold text-2xl mt-6 mb-4">Ví dụ</h2>
            <h3 class="font-semibold text-xl mt-4 mb-4">Input:</h3>
            <div class="" v-for="(param, index) in listParameters" :key="index">
              <div class="text-gray-400">{{ param + '=' }}</div>
              <span class="bg-slate-100 inline-block w-full">{{ listValueParameters[index] }}</span>
            </div>
            <div class="font-semibold text-xl mt-4 mb-4">Output:</div>
            <span class="bg-slate-100 inline-block w-full">Result: {{ testcaseValue.output }}</span>
          </div>
        </div>
        <div v-else>
          <p>Select a problem to view its details.</p>
        </div>
      </div>
      <div class="col-span-5 h-full flex flex-col">
        <!-- Code Editor and Test Case Section -->
        <div class="bg-slate-100 mx-4 p-4 rounded-md mb-6">
          <div class="flex justify-between">
            <div class="flex items-center">
              <CodeBracketIcon class="h-6 w-6 text-green-500" />
              <span class="font-semibold ml-2">Code</span>
            </div>
            <div class="flex items-center">
              <button
                v-if="!timerStarted"
                @click="startTimer"
                class="flex items-center hover:bg-slate-300 duration-300 px-2 py-1 rounded-md"
              >
                <ClockIcon class="w-6 h-6 text-gray-500 mr-2" />
              </button>
              <div v-else class="flex items-center">
                <button
                  @click="toggleTimer"
                  class="flex items-center hover:bg-slate-300 duration-300 px-2 py-1 rounded-md"
                >
                  <span class="font-semibold mr-2">{{ formattedTime }}</span>
                  <component
                    :is="timerRunning ? PauseCircleIcon : PlayCircleIcon"
                    class="w-6 h-6 text-gray-500"
                  />
                </button>
              </div>
            </div>
          </div>
          <div>
            <!-- <textarea
              name="code"
              cols="30"
              rows="20"
              class="w-full outline-none border-t rounded-md p-2 text-slate-900 text-lg"
              v-model="code"
              :readonly="!isEditable"
              @keydown.tab.prevent="handleTab"
              @keydown.enter.prevent="handleEnter"
            >
            </textarea> -->
            <MonacoEditor
              cols="30"
              rows="20"
              v-model="code"
              class="w-full outline-none rounded-md m-2 pr-4 text-slate-900 text-lg"
              :readOnly="!isEditable"
              
            />
            <!-- ý là m đưa t tk mk để t test ntuan - *AnhTuan281 -->
          </div>
          <div class="flex w-full justify-between items-center">
            <div class="flex items-center">
              <button
                v-if="!timerStarted && !timerRunning"
                @click="startEditing"
                class="flex items-center hover:bg-slate-300 duration-300 px-2 py-1 rounded-md"
              >
                <PencilSquareIcon class="w-6 h-6 text-gray-500 mr-2" />
                <span class="font-semibold">Bắt đầu làm</span>
              </button>
            </div>

            <div class="flex justify-end">
              <button
                class="flex hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
                @click="runCode"
              >
                <PlayIcon class="w-6 h-6 text-gray-500 mr-2" />
                <span class="font-semibold">Run</span>
              </button>
              <button
                class="flex hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
                @click="saveSubmission"
              >
                <CloudArrowUpIcon class="w-6 h-6 text-green-500 mr-2" />
                <span class="font-semibold">Submit</span>
              </button>
            </div>
          </div>
        </div>
        <div class="bg-slate-100 mx-4 p-4 rounded-md" id="resultWiew">
          <TabPanel :tabs="['Test case', 'Result']" v-model="currentTab">
            <template v-slot:tab-0>
              <div class="rounded-md">
                <div class="flex flex-col h-40">
                  <div class="mt-3" v-for="(param, index) in listParameters" :key="index">
                    <div class="text-gray-400">{{ param }}=</div>
                    <span class="bg-slate-100 inline-block w-full">{{
                      listValueParameters[index]
                    }}</span>
                  </div>
                </div>
                <div class="mt-5 flex">
                  <CodeBracketIcon class="w-6 h-5 text-gray-600" />
                  <span class="text-sm font-thin">Source</span>
                </div>
              </div>
            </template>
            <template v-slot:tab-1>
              <textarea
                id="result"
                class="w-full h-48 rounded-md font-semibold text-lg p-2"
                rows="5"
                v-model="resultTab"
                placeholder="You must run your code first"
              ></textarea>
            </template>
          </TabPanel>
        </div>
      </div>
    </div>
    <!-- Problem List Modal -->
    <div
      v-if="showProblemList"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-start items-center"
    >
      <div class="bg-white p-4 rounded-md w-2/5 h-full">
        <ProblemList
          :problems="problems"
          @problem-selected="selectProblem"
          @close-form="showProblemList = false"
        />
      </div>
    </div>
    <div>
      <!-- Nội dung trang ProblemsView -->
      <LoginDialog
        v-if="generalStore.showLoginDialog"
        @close="generalStore.showLoginDialog = false"
      />
    </div>
    <div
      v-if="isMessengerSubmissionVisible"
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
            <span
              class="flex text-center text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >{{ MessengerSubmission }}</span
            >
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center"
          >
            <button
              @click="hideMessengerSubmissionModal"
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, compile } from 'vue'
import {
  PlayIcon,
  CloudArrowUpIcon,
  ArrowUturnLeftIcon,
  CodeBracketIcon,
  PlusSmallIcon,
  ClockIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
import axiosClient from '../api/clientAxiosApi'
import Cookies from 'js-cookie'
import { useProblemStore } from '../stores/problemStore'
import ProblemList from '../components/ProblemList.vue'
import TabPanel from '../components/TabPanelResult.vue'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import { useTestcaseStore } from '../stores/testcaseStore'
import LoginDialog from '../components/LoginDialog.vue'
import { useGeneralStore } from '../stores/generalStore'
import { useUserStore } from '../stores/userStore'
import MonacoEditor from '../components/monacoCode.vue'
const generalStore = useGeneralStore()
const code = ref('// Viết mã Java của bạn ở đây')
const userStore = useUserStore()
const problems = ref([])
const testcase = ref(null)
const router = useRouter()
let functionClass = '\n\t*\n'
const listParameters = ref([])
const listValueParameters = ref([])
const submissionResult = ref()

const selectedProblem = ref(null)
// const code = ref('public class Solutions{' + functionClass + '}')
const resultTab = ref('')
const showProblemList = ref(false)
const currentTab = ref(0)
const testcaseValue = ref()

const problemStore = useProblemStore()
const testcaseStore = useTestcaseStore()

const timeElapsed = ref(0)
const timerStarted = ref(false)
const timerRunning = ref(false)
let intervalId = null

const isEditable = ref(false)

const isMessengerSubmissionVisible = ref(false)
const MessengerSubmission = ref('Nộp bài thành công')

function hideMessengerSubmissionModal() {
  if (selectedProblem.value.test) {
    Cookies.remove('authToken')
    router.push('/')
  }
  isMessengerSubmissionVisible.value = false
  selectedProblem.value = null
  functionClass = '\n\t*\n'
  code.value = 'public class Solutions{' + functionClass + '}'
  resultTab.value = ''
  reset()
}

function showMessengerSubmissionModal() {
  isMessengerSubmissionVisible.value = true
}

// Computed property to format the time
const formattedTime = computed(() => {
  const minutes = Math.floor(timeElapsed.value / 60)
  const seconds = timeElapsed.value % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

const fetchProblemOptions = async () => {
  problems.value = await problemStore.getAllProblem()
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

const fetchTestcaseOptions = async (problemId) => {
  testcase.value = await testcaseStore.getTestcaseByProblemId(problemId)
}

const handleTab = (event) => {
  const currentPosition = event.target.selectionStart
  event.target.value = `${event.target.value.substring(
    0,
    currentPosition
  )}\t${event.target.value.substring(currentPosition)}`
  event.target.selectionStart = event.target.selectionEnd = currentPosition + 1
  code.value = event.target.value
}

const handleEnter = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    const currentPosition = event.target.selectionStart
    const lineStart = event.target.value.lastIndexOf('\n', currentPosition - 1)
    const currentLine = event.target.value.substring(lineStart + 1, currentPosition)
    const shouldIndent = /\{\s*$/.test(currentLine)
    const indentMatch = currentLine.match(/^\s*/)
    const indent = indentMatch ? indentMatch[0] : ''
    const newText = `${event.target.value.substring(0, currentPosition)}\n${
      shouldIndent ? '\t' : ''
    }${indent}${event.target.value.substring(currentPosition)}`
    event.target.value = newText
    event.target.selectionStart = event.target.selectionEnd =
      currentPosition + 1 + (shouldIndent ? 1 : 0) + indent.length
    code.value = event.target.value
  }
}

const runCode = async () => {
  testcaseValue.value = testcase.value[0]
  console.log(selectedProblem.value.returnType)
  const data = {
    code: code.value.trim(),
    parameters: convertToList(testcaseValue.value.inputs),
    output: testcaseValue.value.output,
    functionName: selectedProblem.value.functionName.slice(
      0,
      selectedProblem.value.functionName.indexOf('(')
    ),
    returnType: selectedProblem.value.returnType
  }
  console.log(data)
  const token = Cookies.get('authToken')
  try {
    const run = await axiosClient.post('executes', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${token}`
      }
    })
    const responseString = run.data.responseString
    submissionResult.value = run.data.responseResult
    console.log(selectedProblem.value.test)
    currentTab.value = 1
    await nextTick()

    const result = document.getElementById('result')

    if (result) {
      result.style.color = submissionResult.value ? 'green' : 'red'
      resultTab.value = responseString
    } else {
      console.error("Element with id 'result' not found.")
    }
  } catch (error) {
    console.error(error)
  }
}

const prevProblem = () => {
  const currentIndex = problems.value.findIndex(
    (problem) => problem.id === selectedProblem.value.id
  )
  if (currentIndex > 0) {
    selectProblem(problems.value[currentIndex - 1])
  }
}

const nextProblem = () => {
  const currentIndex = problems.value.findIndex(
    (problem) => problem.id === selectedProblem.value.id
  )
  if (currentIndex < problems.value.length - 1) {
    selectProblem(problems.value[currentIndex + 1])
  }
}

const checkTimeLimit = () => {
  const timeLimitInSeconds = selectedProblem.value.timeLimit * 60
  if (timeElapsed.value >= timeLimitInSeconds) {
    saveSubmission()
    router.push('/')
  }
}

const checkSubmissonResult = (resultTab) => {
  let result = ''

  if (resultTab.includes('ACCEPTED')) {
    result = 'ACCEPTED'
  } else if (resultTab.includes('COMPILE ERROR')) {
    result = 'COMPILE ERROR'
  } else if (resultTab.includes('WRONG ANSWER')) {
    result = 'WRONG ANSWER'
  }

  return result.trim()
}

const checkTestSubmissionByUserIsExist = async (submissionData) => {
  const token = Cookies.get('authToken')
  try {
    const response = await axiosClient.get('submissions/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Kiểm tra nếu đã tồn tại submission có cùng test, problem.id và user.id
    const exists = response.data.some(
      (submission) =>
        submission.test === true &&
        submission.problem.id === submissionData.problem.id &&
        submission.user.id === submissionData.user.id
    )

    return exists
  } catch (error) {
    console.error(error)
    throw error
  }
}

const saveSubmission = async () => {
  stopTimer()
  let result = checkSubmissonResult(resultTab.value)
  await runCode()
  let user
  const token = Cookies.get('authToken')
  const id = decodeTokenAndGetUserId(token)
  user = await userStore.getUserById(id, token)

  const submissionData = {
    source: code.value.trim(),
    submissionTime: new Date(),
    result: result,
    test: selectedProblem.value.test,
    completedTime: timeElapsed.value,
    problem: { id: selectedProblem.value.id },
    user: { id: user.id }
  }
  try {
    const exists = await checkTestSubmissionByUserIsExist(submissionData)

    if (exists) {
      MessengerSubmission.value =
        'Duplicate test submission for the same problem by the same user is not allowed'
      await sleep(1000)
      showMessengerSubmissionModal()
      console.log(MessengerSubmission.value)
      return
    }
    const submit = await axiosClient.post('submissions', submissionData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${token}`
      }
    })

    console.log(submit.data)
    showMessengerSubmissionModal()
  } catch (error) {
    console.error('Error saving submission:', error)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const backToHome = () => {
  router.push('/')
}

const convertToList = (inputString) => {
  let parts = inputString.split(/,\s*(?![^[]*])/).map((item) => item.trim())

  let parameters = parts.map((item) => {
    if (item.startsWith('[') && item.endsWith(']')) {
      return JSON.parse(item.replace(/(\d+),/g, '$1, '))
    } else {
      let parsedNumber = parseInt(item)
      return isNaN(parsedNumber) ? item : parsedNumber
    }
  })
  if (parameters.length === 1) {
    if (Array.isArray(parameters[0])) {
      return [parameters[0]]
    }
    return parameters
  }

  return parameters
}

const getParameter = (functionName) => {
  const parametersStr = functionName.substring(
    functionName.indexOf('(') + 1,
    functionName.indexOf(')')
  )
  const parameterPairs = parametersStr.split(/\s*,\s*/)
  let parametersArray = []
  let regex = /\b(?:int|String|float|double|boolean)\s+/
  parameterPairs.forEach((pair) => {
    // Loại bỏ từ khoá dữ liệu và khoảng trắng từ cặp tham số
    let paramName = pair.replace(regex, '').trim()
    parametersArray.push(paramName)
  })
  return parametersArray
}

const selectProblem = async (problem) => {
  selectedProblem.value = problem
  functionClass = 'public static ' + problem.returnType + ' ' + problem.functionName + '{\n\t}'
  code.value = 'public class Solutions{' + '\n\t' + functionClass + '\n}'
  showProblemList.value = false
  isEditable.value = false
  const functionName = problem.functionName
  listParameters.value = getParameter(functionName)
  await fetchTestcaseOptions(problem.id)
  listValueParameters.value = testcase.value[0].inputs.split(', ').map((item) => item.trim())
  testcaseValue.value = testcase.value[0]
  reset()
}
const startTimer = () => {
  timerStarted.value = true
  timerRunning.value = true
  intervalId = setInterval(() => {
    if (timerRunning.value) {
      timeElapsed.value++
      if (selectedProblem.value.test) checkTimeLimit()
    }
  }, 1000)
}
// để t xem cái

const reset = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  timerStarted.value = false
  timerRunning.value = false
  timeElapsed.value = 0
}

const startEditing = () => {
  isEditable.value = true
  startTimer()
}

const pauseEditing = () => {
  isEditable.value = false
}

const stopTimer = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const toggleTimer = () => {
  timerRunning.value = !timerRunning.value
  if (!timerRunning.value) {
    pauseEditing()
  } else {
    isEditable.value = true
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchProblemOptions()
  if (timerStarted.value && timerRunning.value) {
    startTimer()
  }
})

onBeforeUnmount(() => {
  stopTimer()
})
console.log(isEditable.value);
const props = defineProps({
  selectedProblem: Object,
  testcase: Object
})

const difficultyClass = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'dễ':
      return 'difficulty-easy'
    case 'thường':
      return 'difficulty-medium'
    case 'khó':
      return 'difficulty-hard'
    default:
      return ''
  }
}
</script>
<style>
.difficulty-easy {
  color: green;
}
.difficulty-medium {
  color: orange;
}
.difficulty-hard {
  color: red;
}
</style>
