import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { SerializedUser, UserLoginReply, UserRegistration } from '@tfvb/shared'

import customAxios from '@/helpers/axios'

interface LoginData {
  email: string;
  password: string;
}

export const useAccountStore = defineStore('account', () => {
  const localStorageUser = localStorage.getItem('user')
  const user = ref<SerializedUser | undefined>(localStorageUser && JSON.parse(localStorageUser))
  const accessToken = ref(localStorage.getItem('accessToken') || undefined)
  const refreshToken = ref(localStorage.getItem('refreshToken') || undefined)
  const isLoading = ref(false)
  const accountError = ref()

  const login = async (loginData: LoginData) => {
    const accountStore = useAccountStore()

    try {
      accountStore.isLoading = true

      const { data } = await axios.post<UserLoginReply>('/api/auth/login', loginData)

      accountStore.user = data.user
      localStorage.setItem('user', JSON.stringify(data.user))

      accountStore.accessToken = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken)

      accountStore.refreshToken = data.refreshToken;
      localStorage.setItem('refreshToken', data.refreshToken)
    }
    catch (error: any) {
      accountStore.accountError = error.response?.data.message ?? error.message
    }
    finally {
      accountStore.isLoading = false
    }
  };

  const logout = async () => {
    const { data } = await customAxios.post<UserLoginReply>('/api/auth/logout')
  };

  const register = async (registrationData: UserRegistration) => {
    const { data } = await axios.post<UserLoginReply>('/api/user/register', { registrationData })
    return data
  };

  return {
    user,
    accessToken,
    refreshToken,
    isLoading,
    accountError,
    login,
    logout,
    register,
  }
})
