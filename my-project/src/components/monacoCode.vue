<template>
  <div>
    <div ref="editorContainer" style="height: 500px;"></div>
    <div v-if="props.readOnly" class="warning-text">Click "Bắt đầu làm bài" để có thể sử dụng editor</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, defineProps, defineEmits } from 'vue';
import * as monaco from 'monaco-editor';

const props = defineProps({
  modelValue: String,
  readOnly: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

const editorContainer = ref(null);
let editor;

onMounted(() => {
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: 'java',
    theme: 'vs-light',
    readOnly: props.readOnly
  });

  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor.getValue());
  });

  monaco.languages.registerCompletionItemProvider('java', {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        {
          label: 'System.out.println',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'System.out.println(${1:expression});',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Prints a message to the standard output stream.'
        },
        {
          label: 'for loop',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Creates a for loop.'
        },
        {
          label: 'class declaration',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'public class ${1:ClassName} {\n\t${2}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Declares a new Java class.'
        },
        {
          label: 'main method',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'public static void main(String[] args) {\n\t${1}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Declares the main method.'
        },
        {
          label: 'method declaration',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'public ${1:void} ${2:methodName}(${3}) {\n\t${4}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Declares a new method.'
        },
        {
          label: 'if statement',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'if (${1:condition}) {\n\t${2}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Creates an if statement.'
        },
        {
          label: 'try-catch',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'try {\n\t${1}\n} catch (${2:Exception} e) {\n\t${3}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Creates a try-catch block.'
        },
        {
          label: 'System.err.println',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'System.err.println(${1:expression});',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Prints a message to the standard error stream.'
        },
        {
          label: 'variable declaration',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '${1:int} ${2:variableName} = ${3:value};',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Declares a new variable.'
        }
      ];
      return { suggestions: suggestions };
    }
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

watch(() => props.readOnly, (newVal) => {
  editor.updateOptions({ readOnly: newVal });
});
</script>

<style scoped>
.warning-text {
  color: rgb(138, 117, 22);
  text-decoration: underline;
  margin-top: 10px;
}
</style>
