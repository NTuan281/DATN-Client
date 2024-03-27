<template>
  <AdminLayout>
    <div id="app" class="max-w-2xl mx-auto mt-16">
      <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md">
        <label for="problem" class="block text-sm font-medium text-gray-600">Tên Bài:</label>
        <input v-model="problem" type="text" id="problem" class="mt-1 p-2 border w-full" />
        <label for="difficulty" class="block text-sm font-medium text-gray-600">Độ Khó:</label>
        <select v-model="difficulty" id="difficulty" class="mt-1 p-2 border w-full">
          <option value="easy">Dễ</option>
          <option value="normal">Thường</option>
          <option value="hard">Khó</option>
        </select>

        <label for="tag" class="block text-sm font-medium text-gray-600">Loại:</label>
        
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

        <label for="guide" class="block text-sm font-medium text-gray-600">Tên hàm:</label>
        <input v-model="guide" id="guide" class="mt-1 p-2 border w-full">
        <label for="description" class="block text-sm font-medium text-gray-600"
          >Mô tả</label
        >
        <textarea v-model="description" id="description" class="mt-1 p-2 border w-full"></textarea>
        <label for="edit" class="block text-sm font-medium text-gray-600">Hiển Thị:</label>
        <div ref="editorRef"></div>
        <button @click="CheckDoc">Check doccument</button>
        <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Tạo</button>
        <!-- Dialog for adding new tag -->
        <div
          v-if="isAddTagDialogVisible"
          class="fixed inset-0 overflow-y-auto flex items-center justify-center"
        >
          <div class="fixed inset-0 bg-black opacity-50"></div>

          <div class="relative bg-white p-8 rounded shadow-md w-96">
            <h2 class="text-lg font-semibold mb-4">Thêm Loại Mới</h2>

            <label for="newTagName">Tên Loại:</label>
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
import { ref, onMounted,computed } from 'vue'
import axiosClient from '../api/clientAxiosApi'
import AdminLayout from '../layouts/AdminLayout.vue'
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's Snow theme CSS


const description = ref('')
const guide = ref('')
const tag = ref('')
const tagOptions = ref([])
const isAddTagDialogVisible = ref(false)
const newTagName = ref('')
const problem = ref('')
const difficulty = ref('')
const selectedTagId = ref(null);

const selectedTagName = computed(() => {
  const selectedTagId = tag.value;
  const selectedTag = tagOptions.value.find(tagOption => tagOption.id === selectedTagId);
  return selectedTag ? selectedTag.nameTag : null;
});

const editorRef = ref(null);
let quill = null;

const axiosInstance = axiosClient.create(); // Tạo một instance axios mới

// Thêm interceptor để tự động thêm token vào header "Authorization"
axiosInstance.interceptors.request.use(
  config => {
    const token = getCookie('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

onMounted(() => {
  quill = new Quill(editorRef.value, {
    theme: "snow", // Choose Quill's theme (snow, bubble, etc.)
    // You can add other options here as per Quill's documentation
  });
});

const logContent = () => {
  if (quill) {
    const content = quill.root.innerHTML;
    console.log(content); // Lấy n
  }
}
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



const submitForm = async () => {
  let user;
  // const token = getCookie('authToken')
  // const id = decodeTokenAndGetUserId(token);
  // try {
  //   user = await axiosInstance.get('users/'+id);
  // } catch (error) {
  //   console.error("Error get user:", error);
  // }
  // console.log(selectedTagName.value);
  // console.log(user.data)

  if (!tag.value) {
    console.error('No tag selected.');
    return;
  }

  const problemData = {
    name: problem.value,
    difficulty: difficulty.value,
    guide: guide.value,
    description: description.value,
    content: quill.root.innerHTML,
    // user: user.data
  };

  console.log(problemData);
  try {
  //  const response = await axiosClient.post('problem', problemData)
    // Xử lý response nếu cần
    console.log(problemData);
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const CheckDoc = ()=>{
  if(quill ){
    const content = quill.root.innerHTML
    console.log(content);
  }
}
function decodeTokenAndGetUserId(token) {
    try {
        if (token) {
            const [, payloadBase64] = token.split('.');
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // Đảm bảo rằng 'role' là một trường có trong payload trước khi truy cập
            if (decodedPayload && decodedPayload.role) {
                return decodedPayload.id;
            } else {
                console.error('Trường "role" không tồn tại trong payload.');
                return null;
            }
        } else {
            console.error('Token là null hoặc undefined.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
        return null;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
