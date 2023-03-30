import axios, { AxiosHeaders } from 'axios';

import { useAccountStore } from '@/stores/account';
import { useUIStore } from '@/stores/ui';

let loadingTimeout: NodeJS.Timeout;

const dispatchIsLoading = (isLoading: boolean) => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
  }

  const accountStore = useAccountStore();

  if (isLoading) {
    loadingTimeout = setTimeout(() => accountStore.isLoading = isLoading), 500;
  }
  else {
    accountStore.isLoading = isLoading;
  }
};

const instance = axios.create();

instance.interceptors.request.use(config => {
  const accountStore = useAccountStore();

  accountStore.isLoading = true;

  if (config.headers && accountStore.accessToken) {
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${accountStore.accessToken}`);
  }

  return config;
},
error => {
  dispatchIsLoading(false);

  const uiStore = useUIStore();
  uiStore.globalError = error.message;

  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  dispatchIsLoading(false);
  return response;
}, async error => {
  const config = error.config;
  const accountStore = useAccountStore();

  const goToLogin = async (): Promise<void> => {
    config._retry = false;
    await accountStore.logout();
    return Promise.resolve();
  };

  dispatchIsLoading(false);

  // Always allow a logout
  if (config.url === '/api/auth/logout') {
    return Promise.resolve();
  }

  if (error.response.status === 401 && !config._retry) {
    config._retry = true;
    try {
      const { data: { accessToken } } = await axios.post<{ accessToken: string }>('/api/auth/refresh-access-token', undefined, {
        headers: {
          Authorization: `Bearer ${accountStore.refreshToken}`,
        },
      });

      accountStore.accessToken = accessToken;

      return instance(config);
    }
    catch (_error) {
      return goToLogin();
    }
  }
  else if (error.response.status === 401) {
    return goToLogin();
  }

  const uiStore = useUIStore();
  uiStore.globalError = error.message;

  return Promise.reject(error);
});

export default instance;
