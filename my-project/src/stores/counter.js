import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
  state: ()=>({
    isLoginFormOpen : false
  })
  
})
