import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'




type LoginParams = { username: string, password: string }
type LoginResult = { bearerToken: string }

export const useAuthStore = defineStore('auth', {
  state: () => {
    const storage = useLocalStorage('user-auth', { username: '', bearerToken: '' })
    return ({ isLoggedIn: false, username: storage.value.username, bearerToken: storage.value.bearerToken })
  },
  actions: {
    login(params: LoginParams) {
      const storage = useLocalStorage('user-auth', {})
      return axios.post(`https://localhost:7020/api/users/${params.username}:authenticate`, { ...params })
        .then((response: AxiosResponse<LoginResult>) => {
          if (!!response.data.bearerToken) {
            this.isLoggedIn = true
            this.username = params.username
            this.bearerToken = response.data.bearerToken
            storage.value = { username: this.username, bearer: this.bearerToken }
          }
        })
    }
  }
})