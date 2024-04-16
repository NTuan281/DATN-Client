import { defineStore } from "pinia";
import axiosClient from "../api/clientAxiosApi";
export const useProblemStore = defineStore("problem", {
  state: () => ({
  }),

  actions: {
        async getAllProblem(token){
          try {
             const response  = await axiosClient.get("problem",{
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            'Accept': 'application/json, text/plsain, */*'
              }})
            return response.data
          } catch (error) {
            console.log(error);
          }
           
        },
        async execute(code, parameters, output, functionName){
          const data ={
            code: code.value.trim(),
            parameters: parameters,
            output: output,  
            functionName: functionName
          }
          try {
            // Gọi API đăng ký
            const response = await axiosClient.post("executes", data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plsain, */*'
            }});
            return response.data
          } catch (error) {
            throw error;
          }
        }
  },
});