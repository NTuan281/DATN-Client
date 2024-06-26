<template>
  <div>
    <template v-if="isAdmin">
      <AdminLayout>
        <!-- Nội dung AdminLayout -->
        <div>
        <h2 class="p-4 text-xl text-slate-900 font-semibold">All Submissions</h2>
        <div class="flex p-4">
          <div class="form-group mr-3">
            <label for="problemId" class="mr-2">Problem:</label>
            <select
              v-model="selectedProblemId"
              id="problemId"
              class="form-control hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
            >
              <option value="">Select Problem ID</option>
              <option v-for="problem in problems" :key="problem.id" :value="problem.id">
                {{ problem.name }}
              </option>
            </select>
          </div>
          <button
            @click="fetchSubmissions"
            class="btn btn-primary bg-slate-200 hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
          >
            Fetch Submissions
          </button>
        </div>

        <div class="table-responsive m-4 mt-0">
          <h2 class="p-4 pl-0 text-xl text-slate-900 font-semibold">Bài tập</h2>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="px-4">User Full Name</th>
                <th class="px-4">Result</th>
                <th class="px-4">Completed Time</th>
                <th class="px-4">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submission in sortedSubmissions" :key="submission.id">
                <td class="px-4">{{ submission.user.fullName }}</td>
                <td class="px-4">{{ submission.result }}</td>
                <td class="px-4">{{ submission.completedTime }}</td>
                <td class="px-4">{{ submission.source }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="m-4" />
        <div class="flex p-4">
          <div class="form-group mr-3">
            <label for="problemId" class="mr-2">Problem ID:</label>
            <select
              v-model="selectedTestProblemId"
              id="problemId"
              class="form-control hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
            >
              <option value="">Select Problem ID</option>
              <option v-for="problem in problemsIsTest" :key="problem.id" :value="problem.id">
                {{ problem.name }}
              </option>
            </select>
            <button
              @click="fetchTestSubmissions"
              class="btn btn-primary bg-slate-200 hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
            >
              Fetch Test Submissions
            </button>
          </div>
        </div>
        <div class="table-responsive m-4">
          <h2 class="p-4 pl-0 text-xl text-slate-900 font-semibold">Bài kiểm tra</h2>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="px-4">User Full Name</th>
                <th class="px-4">Result</th>
                <th class="px-4">Completed Time</th>
                <th class="px-4">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submission in testSubmissionsResult" :key="submission.id">
                <td class="px-4">{{ submission.user.fullName }}</td>
                <td class="px-4">{{ submission.result }}</td>
                <td class="px-4">{{ submission.completedTime }}</td>
                <td class="px-4">{{ submission.source }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </AdminLayout>
    </template>

    <template v-else>
      <!-- Nội dung khi không phải admin -->
      <div>
        <h2 class="p-4 text-xl text-slate-900 font-semibold">All Submissions</h2>
        <div class="flex p-4">
          <div class="form-group mr-3">
            <label for="problemId" class="mr-2">Problem:</label>
            <select
              v-model="selectedProblemId"
              id="problemId"
              class="form-control hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
            >
              <option value="">Select Problem ID</option>
              <option v-for="problem in problems" :key="problem.id" :value="problem.id">
                {{ problem.name }}
              </option>
            </select>
          </div>
          <button
            @click="fetchSubmissions"
            class="btn btn-primary bg-slate-200 hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
          >
            Fetch Submissions
          </button>
        </div>

        <div class="table-responsive m-4 mt-0">
          <h2 class="p-4 pl-0 text-xl text-slate-900 font-semibold">Bài tập</h2>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="px-4">User Full Name</th>
                <th class="px-4">Result</th>
                <th class="px-4">Completed Time</th>
                <th class="px-4">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submission in sortedSubmissions" :key="submission.id">
                <td class="px-4">{{ submission.user.fullName }}</td>
                <td class="px-4">{{ submission.result }}</td>
                <td class="px-4">{{ submission.completedTime }}</td>
                <td class="px-4">{{ submission.source }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="m-4" />
        <div class="flex p-4">
          <div class="form-group mr-3">
            <label for="problemId" class="mr-2">Problem ID:</label>
            <select
              v-model="selectedTestProblemId"
              id="problemId"
              class="form-control hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
            >
              <option value="">Select Problem ID</option>
              <option v-for="problem in problemsIsTest" :key="problem.id" :value="problem.id">
                {{ problem.name }}
              </option>
            </select>
            <button
              @click="fetchTestSubmissions"
              class="btn btn-primary bg-slate-200 hover:bg-slate-300 duration-300 px-2 py-1 rounded-md mx-2"
            >
              Fetch Test Submissions
            </button>
          </div>
        </div>
        <div class="table-responsive m-4">
          <h2 class="p-4 pl-0 text-xl text-slate-900 font-semibold">Bài kiểm tra</h2>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="px-4">User Full Name</th>
                <th class="px-4">Result</th>
                <th class="px-4">Completed Time</th>
                <th class="px-4">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submission in testSubmissionsResult" :key="submission.id">
                <td class="px-4">{{ submission.user.fullName }}</td>
                <td class="px-4">{{ submission.result }}</td>
                <td class="px-4">{{ submission.completedTime }}</td>
                <td class="px-4">{{ submission.source }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axiosClient from '../api/clientAxiosApi'
import Cookies from 'js-cookie'
import AdminLayout from '../layouts/AdminLayout.vue'

const problems = ref([])
const problemsIsTest = ref([])

const allSubmissions = ref([])
const submissionResult = ref([])
const testSubmissionsResult = ref([])

const selectedProblemId = ref('')
const selectedTestProblemId = ref('')
const selectedSubmissionTime = ref('')
const isAdmin = ref(false)

const sortedSubmissions = computed(() => {
  return submissionResult.value.slice().sort((a, b) => a.completedTime - b.completedTime)
})

function decodeTokenAndGetUserRole() {
  const token = Cookies.get('authToken')
  try {
    if (token) {
      const [, payloadBase64] = token.split('.')
      const decodedPayload = JSON.parse(atob(payloadBase64))

      // Đảm bảo rằng 'role' là một trường có trong payload trước khi truy cập
      if (decodedPayload && decodedPayload.role) {
        return decodedPayload.role
      } else {
        console.error('Trường "role" không tồn tại trong payload.')
        return null
      }
    } else {
      console.error('Token là null hoặc undefined.')
      return null
    }
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error)
    return null
  }
}

const fetchSubmissions = async () => {
  const token = Cookies.get('authToken')
  try {
    const params = {
      problemId: selectedProblemId.value
    }
    const response = await axiosClient.post('/submissions/leaderboard', params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    submissionResult.value = response.data
    console.log(submissionResult.value, params, response.data)
  } catch (error) {
    console.error('Error fetching submissions:', error)
  }
}

const fetchAllSubmission = async () => {
  const token = Cookies.get('authToken')
  try {
    const response = await axiosClient.get('submissions/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    allSubmissions.value = response.data

    console.log(allSubmissions.value)

    allSubmissions.value.forEach((sub) => {
      if (sub.test === false) {
        problems.value.push(sub.problem)
      } else if (sub.test === true) {
        problemsIsTest.value.push(sub.problem)
      }
    })

    problems.value = uniqueProblems(problems.value)
    problemsIsTest.value = uniqueProblems(problemsIsTest.value)

    submissionDates.value = [...new Set(allSubmissions.value.map((sub) => sub.submissionTime))]
  } catch (error) {
    console.error(error)
    throw error
  }
}

const uniqueProblems = (problemsArray) => {
  const seen = new Set()
  return problemsArray.filter((problem) => {
    const id = problem.id
    if (seen.has(id)) {
      return false
    } else {
      seen.add(id)
      return true
    }
  })
}

const fetchTestSubmissions = async () => {
  const token = Cookies.get('authToken')
  try {
    const params = {
      problemId: selectedTestProblemId.value
    }
    const response = await axiosClient.post('/submissions/leaderboard', params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    testSubmissionsResult.value = response.data
    console.log(submissionResult.value, params, response.data)
  } catch (error) {
    console.error('Error fetching test submissions:', error)
  }
}

onMounted(() => {
  fetchAllSubmission()
  const role = decodeTokenAndGetUserRole()
  if (role === 'ADMIN') isAdmin.value = true
})
</script>
<style scoped>
.form-inline .form-group {
  margin-right: 1rem;
}

.table th,
.table td {
  padding: 0.75rem 1.5rem;
  border: 1px solid #dee2e6;
}

.table th {
  text-align: center;
  border: 1px solid #dee2e6;
}

.table td {
  vertical-align: middle;
}
</style>
