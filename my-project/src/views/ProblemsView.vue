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
          <PlayIcon class="w-6 h-6 text-gray-500 mr-2" />
          <span class="font-semibold">Run</span>
        </button>
        <button class="flex hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2">
          <CloudArrowUpIcon class="w-6 h-6 text-green-500 mr-2" />
          <span class="font-semibold">Submit</span>
        </button>
      </div>
      <div>
        <button class="flex hover:bg-slate-300 px-3 py-1 rounded-md">
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
              class="w-full outline-none border-t rounded-md p-2 text-slate-900"
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
            <textarea class="w-full border outline-none rounded-md px-2 mt-3" rows="5"></textarea>
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
} from '@heroicons/vue/24/outline'
</script>
