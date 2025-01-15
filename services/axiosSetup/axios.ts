import axios, { AxiosResponse, AxiosError } from 'axios';
import { router } from 'expo-router';
import { getLocalStorageData, storeLocalStorageData, clearLocalStorage } from './storage';
import config from './axiosConfig';

const { apiHost } = config().secrets;

const customAxios = axios.create({
  baseURL: apiHost,
});

customAxios.interceptors.response.use(
  (response) => handleResponse(response),
  (error) => handleError(error)
);

const handleResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
  const newAccessToken = response.headers['x-access-token'];
  const newRefreshToken = response.headers['x-refresh-token'];

  if (newAccessToken && newRefreshToken) {
    await storeTokens(newAccessToken, newRefreshToken);
  }

  return response;
};

const handleError = async (error: AxiosError | any): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    const refreshToken = await getRefreshToken();

    if (refreshToken) {
      try {
        return await retryWithNewTokens(error.config) as any;
      } catch (retryError) {
        await clearClientStorage();
        redirectToHomePage();
        return Promise.reject(retryError);
      }
    }

    await clearClientStorage();
    redirectToHomePage();
  }

  return Promise.reject(error);
};

const retryWithNewTokens = async (originalConfig: any): Promise<AxiosResponse> => {
  const newAccessToken = await getAccessToken();

  if (newAccessToken) {
    originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await axios(originalConfig);
  }

  throw new Error('Failed to retry with new access token.');
};

customAxios.interceptors.request.use(
  async (config: any) => {
    const token = await getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getAccessToken = async (): Promise<string | null> => {
  const user = await getLocalStorageData('user');
  if (user) {
    const newUser = JSON.parse(user);
    return newUser.accessToken;
  }
  return null;
};

const getRefreshToken = async (): Promise<string | null> => {
  const user = await getLocalStorageData('user');
  if (user) {
    const newUser = JSON.parse(user);
    return newUser.refreshToken;
  }
  return null;
};

const storeTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  return await storeLocalStorageData('user', { accessToken, refreshToken });
};

const clearClientStorage = async (): Promise<void> => {
  return await clearLocalStorage();
};

const redirectToHomePage = (): void => {
  router.replace('/login');
};

export default customAxios;