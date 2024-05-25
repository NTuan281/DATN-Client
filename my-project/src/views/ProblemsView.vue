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
    <div class="grid grid-cols-10 w-full">
      <div id="problemContent" class="col-span-5 bg-slate-100 m-4 mr-0 p-4 rounded-md">
        <!-- Problem Content -->
        <div v-if="selectedProblem" class="p-3">
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

        </div>
        <div v-else>
          <p>Select a problem to view its details.</p>
        </div>
      </div>
      <div class="col-span-5">
        <!-- Code Editor and Test Case Section -->
        <div class="bg-slate-100 m-4 p-4 rounded-md">
          <div class="flex">
            <CodeBracketIcon class="h-6 w-6 text-green-500" />
            <span class="font-semibold ml-2">Code</span>
          </div>
          <textarea
            name="code"
            cols="30"
            rows="20"
            class="w-full outline-none border-t rounded-md p-2 text-slate-900 text-lg"
            v-model="code"
            @keydown.tab.prevent="handleTab"
            @keydown.enter.prevent="handleEnter"
          ></textarea>
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
        <div class="bg-slate-100 m-4 p-4 rounded-md" id="resultWiew">
          <TabPanel :tabs="['Test case', 'Result']">
            <template v-slot:tab-0>
              <div class="rounded-md ">
                <div class="flex ">
                  <button
                    class="px-4 py-2 bg-slate-200 rounded-md text-sm font-semibold active:bg-slate-500 duration-300"
                  >
                    Case 1
                  </button>
                  <button
                    class="px-4 py-2 bg-slate-200 rounded-md text-sm font-semibold ml-2 active:bg-slate-500 duration-300"
                  >
                    Case 2
                  </button>
                  <button
                    class="px-4 py-2 bg-slate-200 rounded-md text-sm font-semibold ml-2 active:bg-slate-500 duration-300"
                  >
                    Case 3
                  </button>
                  <button class="px-4 py-2 ml-2 hover:bg-slate-200 duration-300 rounded-md">
                    <PlusSmallIcon class="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                <div class="flex mt-5 h-16"></div>
                <div class="mt-5 flex">
                  <CodeBracketIcon class="w-6 h-5 text-gray-600" />
                  <span class="text-sm font-thin">Source</span>
                </div>
              </div>
            </template>
            <template v-slot:tab-1>
              <textarea
                id="resultTab"
                class="w-full h-40 rounded-md"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  PlayIcon,
  CloudArrowUpIcon,
  ArrowUturnLeftIcon,
  CodeBracketIcon,
  CheckIcon,
  PlusSmallIcon
} from '@heroicons/vue/24/outline'
import axiosClient from '../api/clientAxiosApi'
import Cookies from 'js-cookie'
import { useProblemStore } from '../stores/problemStore'
import ProblemList from '../components/ProblemList.vue'
import TabPanel from '../components/TabPanelResult.vue'
import { useRouter } from 'vue-router';

const problems = ref([])
const resultTab = ref('')
const router =useRouter()

const selectedProblem = ref(null)
const code = ref('public class Solutions{\n\t*\n}')
const result = ref('')
const showProblemList = ref(false)

const problemStore = useProblemStore()

const fetchProblemOptions = async () => {
  problems.value = await problemStore.getAllProblem()
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
  const data = {
    code: code.value.trim(),
    parameters: [],
    output: 'Hello world',
    functionName: 'hello'
  }
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
    const responseResult = run.data.responseResult
    const resultTab = document.getElementById('result')

    resultTab.style.color = responseResult ? 'green' : 'red'
    result.value = responseString
  } catch (error) {
    console.error(error)
  }
}

const prevProblem = () => {
  const currentIndex = problems.value.findIndex(
    (problem) => problem.id === selectedProblem.value.id
  )
  if (currentIndex > 0) {
    selectedProblem.value = problems.value[currentIndex - 1]
  }
}

const nextProblem = () => {
  const currentIndex = problems.value.findIndex(
    (problem) => problem.id === selectedProblem.value.id
  )
  if (currentIndex < problems.value.length - 1) {
    selectedProblem.value = problems.value[currentIndex + 1]
  }
}

const saveSubmission = () => {
  // Logic for saving the submission
}

const backToHome = () => {
  Cookies.remove('authToken');
  router.push('/');
}

const selectProblem = (problem) => {
  selectedProblem.value = problem
  code.value = code.value.replace('*', 'public static ' + problem.guide + '{\n\t}')
  showProblemList.value = false
}

onMounted(() => {
  fetchProblemOptions()
})

const props = defineProps({
  selectedProblem: Object
})

const difficultyClass = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'dễ':
      return 'difficulty-easy'
    case 'normal':
      return 'difficulty-medium'
    case 'bình thường':
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
/* #resultView {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

} */
</style>
