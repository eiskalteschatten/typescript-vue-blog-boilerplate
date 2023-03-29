import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { SerializedUser, UserLoginReply, UserRegistration } from '@tbm/shared';

import customAxios from '@/helpers/axios';
import router from '@/router';

interface LoginData {
  email: string;
  password: string;
}

export const useAccountStore = defineStore('account', () => {
  const localStorageUser = localStorage.getItem('user');
  const user = ref<SerializedUser | undefined>(localStorageUser && JSON.parse(localStorageUser));
  const accessToken = ref(localStorage.getItem('accessToken') || undefined);
  const refreshToken = ref(localStorage.getItem('refreshToken') || undefined);
  const isLoading = ref(false);
  const accountError = ref();

  const login = async (loginData: LoginData) => {
    const accountStore = useAccountStore();

    try {
      accountStore.isLoading = true;

      const { data } = await axios.post<UserLoginReply>('/api/auth/login', loginData);

      accountStore.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));

      accountStore.accessToken = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken);

      accountStore.refreshToken = data.refreshToken;
      localStorage.setItem('refreshToken', data.refreshToken);

      router.push({ name: 'Home' });
    }
    catch (error: any) {
      accountStore.accountError = error.response?.data.message ?? error.message;
    }
    finally {
      accountStore.isLoading = false;
    }
  };

  const logout = async () => {
    const accountStore = useAccountStore();

    try {
      accountStore.isLoading = true;

      await customAxios.post<UserLoginReply>('/api/auth/logout');

      accountStore.user = undefined;
      localStorage.removeItem('user');

      accountStore.accessToken = undefined;
      localStorage.removeItem('accessToken');

      accountStore.refreshToken = undefined;
      localStorage.removeItem('refreshToken');

      accountStore.accountError = undefined;

      // TODO
      // Remove everything from store

      router.push({ name: 'Login' });
    }
    catch (error: any) {
      accountStore.accountError = error.response?.data.message ?? error.message;
    }
    finally {
      accountStore.isLoading = false;
    }
  };

  const register = async (registrationData: UserRegistration) => {
    const accountStore = useAccountStore();

    try {
      accountStore.isLoading = true;

      const { data } = await axios.post<UserLoginReply>('/api/user/register', { registrationData });

      accountStore.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));

      accountStore.accessToken = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken);

      accountStore.refreshToken = data.refreshToken;
      localStorage.setItem('refreshToken', data.refreshToken);

      router.push({ name: 'Home' });
    }
    catch (error: any) {
      accountStore.accountError = error.response?.data.message ?? error.message;
    }
    finally {
      accountStore.isLoading = false;
    }
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
  };
});
