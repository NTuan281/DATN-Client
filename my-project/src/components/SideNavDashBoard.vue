<template>
  <aside class="flex flex-col bg-gray-800 h-screen overflow-auto text-white">
    <div class="px-4 text-4xl font-bold py-4">Learn Java</div>
    <div class="px-4 text-2xl font-semibold py-2">
      <RouterLink to="/dashboard"> Dashboard </RouterLink>
    </div>
    <div class="">
      <div class="mx-auto w-full max-w-md rounded-2xl p-2">
        <!-- user -->
        <Disclosure as="div" class="my-3 border-b" v-slot="{ open }">
          <DisclosureButton
            class="flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium"
          >
            <UserCircleIcon class="w-6 h-6 mr-2" />
            <span>User</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'UserManagement' }">
              <DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All User
              </DisclosurePanel>
            </RouterLink>
            <DisclosurePanel
              @click="generalStore.isCreatedAminOpen = true"
              class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
            >
              Create User
            </DisclosurePanel>
          </TransitionRoot>
        </Disclosure>
        <!-- problem -->
        <Disclosure as="div" class="my-3 border-b" v-slot="{ open }">
          <DisclosureButton class="flex w-full rounded-lg px-4 py-2 text-sm font-medium">
            <BookOpenIcon class="w-6 h-6 mr-2" />
            <span>Problem</span>
            <ChevronRightIcon
              :class="open ? 'rotate-90 transform duration-300' : 'duration-300'"
              class="h-5 w-5 text-gray-200"
            />
          </DisclosureButton>
          <TransitionRoot
            :show="open"
            enter="transition  ease-in-out duration-200 transform"
            enter-from="opacity-0 -translate-y-5 "
            enter-to=" opacity-100 translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-5"
          >
            <RouterLink :to="{ name: 'ProblemManagement' }">
              <DisclosurePanel
                class="px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                All problem
              </DisclosurePanel>
            </RouterLink>
            <RouterLink :to="{ name: 'AddProblem' }">
              <DisclosurePanel
                class="cursor-pointer px-4 py-2 pl-10 text-sm hover:text-gray-800 hover:bg-gray-200 duration-300 text-gray-200 rounded"
              >
                Create problem
              </DisclosurePanel>
            </RouterLink>
          </TransitionRoot>
        </Disclosure>
        <!--Submit-->
        <div class="flex w-full rounded-lg px-4 py-2 text-sm font-medium cursor-pointer">
          <RouterLink :to="{ name: 'SubmitManagement' }" class="flex items-center w-full">
            <ClipboardDocumentCheckIcon class="w-6 h-6 mr-2" />
            <span>Submissions </span>
          </RouterLink>
        </div>
      </div>
      <div class="">
        <button class="flex hover:bg-slate-300  rounded-md px-4 py-2" @click="backToHome">
          <ArrowUturnLeftIcon class="w-6 h-6 text-gray-500" />
          <span class="font-semibold ml-2">Back to home</span>
        </button>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, TransitionRoot } from '@headlessui/vue'
import {
  ChevronRightIcon,
  CubeIcon,
  UserCircleIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon, 
  ArrowUturnLeftIcon
} from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'
import { useGeneralStore } from '../stores/generalStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const generalStore = useGeneralStore()
const backToHome = () => {
  router.push('/')
}
</script>
