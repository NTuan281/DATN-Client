<template>
    <div ref="editorContainer" style="height: 500px;"></div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, ref, watch, defineProps, defineEmits } from 'vue';
  import * as monaco from 'monaco-editor';
  
  const props = defineProps({
    modelValue: String
  });
  const emit = defineEmits(['update:modelValue']);
  
  const editorContainer = ref(null);
  let editor;
  
  onMounted(() => {
    editor = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      language: 'java',
      theme: 'vs-light'
    });
  
    editor.onDidChangeModelContent(() => {
      emit('update:modelValue', editor.getValue());
    });
  });
  
  onBeforeUnmount(() => {
    if (editor) {
      editor.dispose();
    }
  });
  
  watch(() => props.modelValue, (newVal) => {
    if (editor.getValue() !== newVal) {
      editor.setValue(newVal);
    }
  });
  </script>
  
  <style scoped>
  /* Thêm CSS nếu cần */
  </style>
  