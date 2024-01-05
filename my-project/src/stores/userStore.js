import { defineStore } from "pinia";
import axiosClient from "../api/clientAxiosApi";
export const useUserStore = defineStore("user", {
  state: () => ({
  }),

  actions: {
        async getAllUser(){
            const response  = await axiosClient.get("users")
            return response.data
        },
        async LoginUser(user, password){
          try {
            const request = await axiosClient.post("auth/login",{
            username: user,
            password:password
          })
          return request.data
          } catch (error) {
            throw error
          }
        },
        async RegiserUser(user, password){
          try {
            const request = await axiosClient.post("auth/login",{
            username: user,
            password:password
          })
          return request.data
          } catch (error) {
            throw error
          }
          
        }
  },
});
