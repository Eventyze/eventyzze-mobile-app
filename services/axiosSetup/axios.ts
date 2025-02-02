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
        console.warn('Token refresh failed:', retryError);
        await clearClientStorage(); 
        redirectToLoginPage();
        return Promise.reject(retryError);
      }
    }

    console.warn('No refresh token available, clearing storage');
    await clearClientStorage();
    redirectToLoginPage();
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
  const accessToken = await getLocalStorageData('accessToken');
  return accessToken;
};

const getRefreshToken = async (): Promise<string | null> => {
  const refreshToken = await getLocalStorageData('refreshToken');
  return refreshToken;
};

const storeTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await storeLocalStorageData('accessToken', accessToken);
    await storeLocalStorageData('refreshToken', refreshToken);
    console.log("Tokens successfully stored");
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};


const clearClientStorage = async (): Promise<void> => {
  return await clearLocalStorage();
};

export const redirectToLoginPage = (): void => {
  router.replace('/login');
};

export default customAxios;