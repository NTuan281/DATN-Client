import { defineStore } from "pinia";
import axiosClient from "../api/clientAxiosApi";

export const useUserStore = defineStore("user", {
  state: () => ({}),

  actions: {
    async getAllUser(token) {
      try {
        const response = await axiosClient.get("users", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; 
      }
    },
    
    async LoginUser(user, password) {
      try {
        const request = await axiosClient.post("auth/login", {
          username: user,
          password: password
        });
        return request.data;
      } catch (error) {
        throw error;
      }
    },
    
    async RegiserUser(user, password) {
      try {
        const request = await axiosClient.post("auth/register", {
          username: user,
          password: password
        });
        return request.data;
      } catch (error) {
        throw error;
      }
    },
    async getUserById(id, token) {
      try {
        const response = await axiosClient.get("users/"+id, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; 
      }
    }
  }
});
