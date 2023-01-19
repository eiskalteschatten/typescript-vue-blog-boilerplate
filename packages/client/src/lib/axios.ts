import axios, { AxiosHeaders } from 'axios';

import { useAccountStore } from '@/stores/account';
// import { setGlobalError, setIsLoading } from '@/store/entities/ui';

let loadingTimeout: NodeJS.Timeout;

const dispatchIsLoading = (isLoading: boolean) => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
  }

  const store = useAccountStore();

  if (isLoading) {
    loadingTimeout = setTimeout(() => store.isLoading = isLoading), 500;
  }
  else {
    store.isLoading = isLoading;
  }
};

const instance = axios.create();

instance.interceptors.request.use(config => {
  const store = useAccountStore();

  store.isLoading = true;

  if (config.headers && store.accessToken) {
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${store.accessToken}`);
  }

  return config;
},
error => {
  dispatchIsLoading(false);
  // TODO
  // setGlobalError(error.message);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  dispatchIsLoading(false);
  return response;
}, async error => {
  const store = useAccountStore();
  const config = error.config;

  const goToLogin = async (): Promise<void> => {
    config._retry = false;
    await store.logout();
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
          Authorization: `Bearer ${store.refreshToken}`,
        },
      });

      store.accessToken = accessToken;

      return instance(config);
    }
    catch (_error) {
      return goToLogin();
    }
  }
  else if (error.response.status === 401) {
    return goToLogin();
  }

  // TODO
  // setGlobalError(error.message);
  return Promise.reject(error);
});

export default instance;
