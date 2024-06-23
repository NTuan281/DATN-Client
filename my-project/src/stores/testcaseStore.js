import { defineStore } from 'pinia'
import axiosClient from '../api/clientAxiosApi'
import Cookies from 'js-cookie'

export const useTestcaseStore = defineStore('testcase', {
  state: () => ({}),

  actions: {
    async getTestcaseByProblemId(problemId) {
        const token = Cookies.get('authToken')
      try {
        const response = await axiosClient.get('testcases/problem/' + problemId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(problemId);
        return response.data
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
});
