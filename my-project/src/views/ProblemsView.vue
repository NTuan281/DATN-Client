<template>
  <div class="bg-slate-200">
    <div class="flex px-4 py-2 items-center justify-between">
      <div class="flex">
        <!-- logo here -->
        <!-- <img src="" alt=""> -->
        <TableCellsIcon class="h-6 w-6 text-gray-500" />
        <span class="font-semibold ml-2">Pronlem List</span>
        <ChevronLeftIcon class="w-6 h-6 text-gray-500 ml-2" />
        <ChevronRightIcon class="w-6 h-6 text-gray-500 ml-2" />
      </div>
      <div class="flex">
        <button class="flex hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2">
          <PlayIcon class="w-6 h-6 text-gray-500 mr-2"
          @click="runCode()" />
          <span class="font-semibold">Run</span>
        </button>
        <button class="flex hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2">
          <CloudArrowUpIcon class="w-6 h-6 text-green-500 mr-2"
          @click="saveSubmisson()" />
          <span class="font-semibold">Submit</span>
        </button>
      </div>
      <div>
        <button class="flex hover:bg-slate-300 px-3 py-1 rounded-md" @click="backToHome">
          <ArrowUturnLeftIcon class="w-6 h-6 text-gray-500" />
          <span class="font-semibold ml-2">Back to home</span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-10 w-full h-screen">
      <div class="col-span-5 bg-slate-100 m-4 p-4 rounded-md">
        <div class="flex">
          <button class="flex px-2 mx-2 border-r-2">
            <ClipboardDocumentListIcon class="h-6 w-6 text-blue-500" />
            <span class="text-sm active:font-semibold">Description</span>
          </button>
          <button class="flex px-2 mx-2 border-r-2">
            <BookOpenIcon class="h-6 w-6 text-yellow-500" />
            <span class="text-sm font-thin active:font-semibold">Editional</span>
          </button>
          <button class="flex px-2 mx-2 border-r-2">
            <BeakerIcon class="h-6 w-6 text-blue-500" />
            <span class="text-sm font-thin active:font-semibold">Solutions</span>
          </button>
          <button class="flex px-2 mx-2 border-r-2">
            <CloudArrowUpIcon class="h-6 w-6 text-blue-500" />
            <span class="text-sm font-thin active:font-semibold">Submitions</span>
          </button>
        </div>
      </div>
      <div class="col-span-5">
        <div class="bg-slate-100 m-4 p-4 rounded-md">
          <div class="flex">
            <CodeBracketIcon class="h-6 w-6 text-green-500" />
            <span class="font-semibold ml-2">Code</span>
          </div>
          <!-- area code -->
          <div>
            <textarea
              name="code"
              id=""
              cols="30"
              rows="20"
              class="w-full outline-none border-t rounded-md p-2 text-slate-900 text-xl"
              v-model="code"
              @keydown.tab.prevent="handleTab"
              @keydown.enter.prevent="handleEnter"
              
            ></textarea>
          </div>
        </div>
        <div class="bg-slate-100 m-4 p-4 rounded-md">
          <div>
            <CheckIcon class="h-6 w-6 text-green-500 border-2 border-green-500" />
            <span class="font-semibold">Test case</span>
          </div>
          <div class="flex">
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
          <div class="mt-5">
            <div class="font-semibold">Result</div>
            <textarea id="result" class="w-full border outline-none rounded-md px-2 mt-3" rows="5"
            v-model="result"
            ></textarea>
          </div>
          <div class="mt-5 flex">
            <CodeBracketIcon class="w-6 h-5 text-gray-600" />
            <span class="text-sm font-thin">Source</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  CodeBracketIcon,
  PlayIcon,
  CheckIcon,
  PlusSmallIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  BeakerIcon,
  CloudArrowUpIcon,
  TableCellsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUturnLeftIcon
} from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import axiosClient from "../api/clientAxiosApi";
const code = ref(defaultCode)
const result = ref('')

const defaultCode = "public class Solutions{\n\t*\n}";

const handleTab = (event) => {
  if(event.key === "Tab"){
    event.preventDefault()
    code.value += "    "
  }
};
const handleEnter = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const currentPosition = event.target.selectionStart;
    const lineStart = event.target.value.lastIndexOf('\n', currentPosition - 1);
    const currentLine = event.target.value.substring(lineStart + 1, currentPosition);

    // Kiểm tra xem dòng hiện tại có kí tự "{" ở cuối không
    const shouldIndent = /\{\s*$/.test(currentLine);

    // Đếm số lượng khoảng trắng đầu tiên trên dòng hiện tại
    const indentMatch = currentLine.match(/^\s*/);
    const indent = indentMatch ? indentMatch[0] : "";

    // Bỏ qua những ký tự sau con trỏ và chỉ giữ lại dòng đầu tiên
    const newText = event.target.value.substring(0, currentPosition) + '\n' + (shouldIndent ? '\t' : '') + indent + event.target.value.substring(currentPosition);

    event.target.value = newText;

    // Tính vị trí mới cho con trỏ
    const newPosition = currentPosition + 1 + (shouldIndent ? 1 : 0) + indent.length;
    event.target.setSelectionRange(newPosition, newPosition);
  }
};

const runCode = async () => {
  
  const data ={
      code: code.value.trim(),
      // parameters: [[4,6,1,2]],
      // output: "6",  
      // functionName: "findMaxValue"
      parameters: [],
      output: "Hello world",
      functionName: "hello"
    }
    try {
    // Gọi API đăng ký
    const run = await axiosClient.post("executes", data, {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plsain, */*'
  }});
    // Truy cập các thành phần từ response
    const responseString = run.data.responseString;
    const responseResult = run.data.responseResult;

    const resultTab = document.getElementById("result");

    // Sử dụng responseString và responseResult theo nhu cầu của bạn
    if (responseResult) {
      resultTab.style.color = 'green';  // Màu xanh cho kết quả đúng
    } else {
      resultTab.style.color = 'red';  // Màu đỏ cho kết quả sai
    }

    // Gán giá trị cho result.value (ví dụ: gán giá trị của responseString)
    result.value = responseString;
  } catch (error) {
    console.error(error);
  }
}
</script>
