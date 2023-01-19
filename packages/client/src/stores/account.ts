import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { SerializedUser, UserLoginReply, UserRegistration } from '@tfvb/shared'

import customAxios from '@/helper/axios'

interface LoginData {
  email: string;
  password: string;
}

export const useAccountStore = defineStore('account', () => {
  const localStorageUser = localStorage.getItem('user')
  const user = ref<SerializedUser | undefined>(localStorageUser && JSON.parse(localStorageUser))
  const accessToken = ref(localStorage.getItem('accessToken') || undefined)
  const refreshToken = ref(localStorage.getItem('refreshToken') || undefined)
  const isLoading = ref(false);

  const login = async (loginData: LoginData) => {
    const { data } = await axios.post<UserLoginReply>('/api/auth/login', loginData);
    return data;
  };

  const logout = async () => {
    const { data } = await customAxios.post<UserLoginReply>('/api/auth/logout');
    // TODO
    // removeAllData();
    return data;
  };

  const register = async (registrationData: UserRegistration) => {
    const { data } = await axios.post<UserLoginReply>('/api/user/register', { registrationData });
    return data;
  };

  return {
    user,
    accessToken,
    refreshToken,
    isLoading,
    login,
    logout,
    register,
  }
})
