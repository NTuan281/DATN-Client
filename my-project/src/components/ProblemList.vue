<template>
  <div class="problem-list bg-slate-200 p-4 rounded-md ">
    <div class="flex justify-between items-center mb-4 pb-2">
      <h2 class="font-semibold text-xl">Problem List</h2>
      <button @click="closeForm" class="px-4 py-2 text-black rounded-md bg-transparent">
        <XMarkIcon class="h-5 w-5 text-black hover:text-red-500" /> 
      </button>
    </div>
    <hr class="my-4 border-gray-400">
    <ul>
      <li
        v-for="problem in problems"
        :key="problem.id"
        @click="selectProblem(problem)"
        class="p-2 cursor-pointer hover:bg-slate-300 rounded-md"
      >
        <div class="flex justify-between ">
          <h1 class="font-semibold">{{ problem.name}}</h1>
          <h2 :class="difficultyClass(problem.difficulty)">{{ problem.difficulty }}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    XMarkIcon 
  },
  props: {
    problems: {
      type: Array,
      required: true
    },
    selectedProblem: Object
  },
  methods: {
    selectProblem(problem) {
      this.$emit('problem-selected', problem);
    },
    closeForm() {
      this.$emit('close-form');
    },
    difficultyClass(difficulty) {
      switch (difficulty.toLowerCase()) {
        case 'dễ':
      return 'difficulty-easy';
    case 'normal':
      return 'difficulty-medium';
    case 'bình thường':
      return 'difficulty-hard';
    default:
      return '';
      }
    }
  },
};
</script>

<style scoped>
.problem-list {
  width: 100%;
}
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