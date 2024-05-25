<template>
  <div class="tab-panel">
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { 'active-tab': selectedTab === index }]"
        @click="selectTab(index)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <slot :name="`tab-${selectedTab}`"></slot>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    tabs: {
      type: Array,
      required: true
    }
  });
  
  const selectedTab = ref(0);
  
  const selectTab = (index) => {
    selectedTab.value = index;
  };
  </script>
  
  <style scoped>
  .tab-panel {
  font-family: Arial, sans-serif;
  height: auto;
}

.tabs {
  display: flex;
}

.tab-button {
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 18px;
  border: none;
  background-color: rgb(241, 245, 249);
  cursor: pointer;
  position: relative;
}

.tab-button:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -5px; /* Adjust this to control the gap between the button and the separator */
  width: 1px;
  height: 50%; /* Adjust this to make the line shorter */
  background-color: #ccc;
  transform: translateY(-50%);
}

.active-tab {
  background-color: #fff;
  border-bottom: 2px solid #000;
}

.tab-content {
  padding: 10px;
  background-color: #fff;
  border-top: none;
  border-radius: 8px;
}

  </style>
  