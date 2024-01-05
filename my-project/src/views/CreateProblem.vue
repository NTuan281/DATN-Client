<template>
  <AdminLayout>
    <div id="app" class="max-w-md mx-auto mt-16">
      <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md">
        <label for="problem" class="block text-sm font-medium text-gray-600">Problem:</label>
        <input v-model="problem" type="text" id="problem" class="mt-1 p-2 border w-full" />
        <label for="difficulty" class="block text-sm font-medium text-gray-600">Difficulty:</label>
        <select v-model="difficulty" id="difficulty" class="mt-1 p-2 border w-full">
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>

        <label for="tag" class="block text-sm font-medium text-gray-600">Tag:</label>
        
        <div class="flex items-center">
          <div class="flex items-center">
            <div v-for="selectedTag in selectedTags" :key="selectedTag.id" class="selected-tag" @mouseover="showCloseIcon(selectedTag.id)" @mouseleave="hideCloseIcon(selectedTag.id)">
                {{ selectedTag.name }}
                <span v-if="isCloseIconVisible(selectedTag.id)" @click="removeTag(selectedTag.id)" class="close-icon">×</span>
              </div>
            </div>
        </div>
        <div class="flex items-center">
          <select v-model="tag" id="tag" class="mt-1 p-2 border w-full">
            <option v-for="tagOption in tagOptions" :key="tagOption.id" :value="tagOption.id">
              {{ tagOption.nameTag }}
            </option>
          </select>
          <button
            @click="showAddTagDialog"
            type="button"
            class="ml-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Thêm
          </button>
          <button @click="resetTag" type="button" class="ml-2 px-4 py-2 rounded">reset</button>
        </div>

        <label for="guide" class="block text-sm font-medium text-gray-600">Guide:</label>
        <textarea v-model="guide" id="guide" class="mt-1 p-2 border w-full"></textarea>
        <label for="description" class="block text-sm font-medium text-gray-600"
          >Description:</label
        >
        <textarea v-model="description" id="description" class="mt-1 p-2 border w-full"></textarea>

        <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        <!-- Dialog for adding new tag -->
        <div
          v-if="isAddTagDialogVisible"
          class="fixed inset-0 overflow-y-auto flex items-center justify-center"
        >
          <div class="fixed inset-0 bg-black opacity-50"></div>

          <div class="relative bg-white p-8 rounded shadow-md w-96">
            <h2 class="text-lg font-semibold mb-4">Thêm Tag Mới</h2>

            <label for="newTagName">Tên Tag:</label>
            <input
              v-model="newTagName"
              type="text"
              id="newTagName"
              class="mt-1 p-2 border w-full"
              required
            />

            <div class="mt-4 flex justify-end">
              <button @click="addNewTag" class="bg-blue-500 text-white px-4 py-2 rounded">
                Thêm
              </button>
              <button @click="hideAddTagDialog" class="ml-2 text-gray-600">Hủy</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axiosClient from '../api/clientAxiosApi'
import AdminLayout from '../layouts/AdminLayout.vue'

const description = ref('')
const guide = ref('')
const tag = ref('')
const tagOptions = ref([])
const isAddTagDialogVisible = ref(false)
const newTagName = ref('')
const problem = ref('')
const difficulty = ref('')
const selectedTags = ref([]);


const fetchTagOptions = async () => {
  try {
    const response = await axiosClient.get('tags') // Replace YOUR_API_ENDPOINT with your actual API endpoint
    tagOptions.value = response.data
  } catch (error) {
    console.error('Error fetching tag options:', error)
  }
}

const showAddTagDialog = () => {
  isAddTagDialogVisible.value = true
}

const hideAddTagDialog = () => {
  isAddTagDialogVisible.value = false
  newTagName.value = ''
}

const resetTag = () => {
  fetchTagOptions()
}

const addNewTag = async () => {
  try {
    const response = await axiosClient.post('tags', newTagName.value)
    hideAddTagDialog()
  } catch (error) {
    console.error('Error adding new tag:', error)
  }
}

const closeIcons = ref({});

const showCloseIcon = (tagId) => {
  this.$set(closeIcons.value, tagId, true);
};

const hideCloseIcon = (tagId) => {
  this.$set(closeIcons.value, tagId, false);
};

const isCloseIconVisible = (tagId) => {
  return closeIcons.value[tagId] || false;
};

onMounted(() => {
  fetchTagOptions()
})

const selectTag = (tag) => {
  if (!selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
    selectedTags.value.push(tag)
  }
}

const removeTag = (tagId) => {
  selectedTags.value = selectedTags.value.filter((tag) => tag.id !== tagId)
}

const submitForm = async () => {
  const problemData = {
    name: problem.value,
    difficulty: difficulty.value,
    tags: selectedTags.value.map((tag) => tag.id),
    guide: guide.value,  // Thêm các dữ liệu cần thiết khác nếu có
    description: description.value
  }

  try {
    const response = await axiosClient.post('problems', problemData)
    // Xử lý response nếu cần
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<style>
.selected-tag {
  display: inline-block;
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.close-icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  color: red;
  cursor: pointer;
}
</style>
