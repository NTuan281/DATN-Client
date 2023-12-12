import { defineStore } from "pinia";
import axiosClient from "../api/clientAxiosApi";
export const useProblemStore = defineStore("problem", {
  state: () => ({
  }),

  actions: {
        async getAllProblem(){
            const response  = await axiosClient.get("problem")
            return response.data
        },
  },
});