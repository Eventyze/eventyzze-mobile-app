import { storeLocalStorageData } from '../../axiosSetup/storage';
import axios from '../../axiosSetup/axios';

interface SignupBody {
  email: string;
  password: string;
}

interface ApiResponse {
  status: number;
  data: {
    data?: Record<string, any>;
    message?: string;
    [key: string]: any;
  };
}

interface GoogleAuthResponse extends ApiResponse {
  data: {
    message?: string;
    token?: string;
    user?: {
      id: string;
      email: string;
      // ... other user fields
    };
  };
}

interface LoginResponse extends ApiResponse {
  data: {
    data?: Record<string, any>;
    user: {
      id: string;
      email: string;
      role: string;
      isInitialProfileSetupDone?: boolean;
      // ... other user fields
    };
    accessToken: string;
    refreshToken: string;
    message?: string;
  };
}

export const emailSignup = async (body: SignupBody): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/users/email-signup", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error:any) {
      return error.response;
    }
  };


  export const otpVerification = async(body: any) => {
    try{
      const response = await axios.post('/users/verify-otp', body, {
        headers: {
        "Content-Type": "application/json"
        }
      })

      return response
    }catch(error:any){
      return error.response
    }
  }


  export const resendOtp = async(email: string) => {
    try{
      const response = await axios.get(`/users/resend-otp?email=${email}`, {
        headers: {
        "Content-Type": "application/json"
        }
      })

      return response
    }catch(error:any){
      return error.response
    }
  }



  export const googleAuth = async (token: string): Promise<GoogleAuthResponse> => {
    try {
      const response = await axios.post("/users/google-auth", { token }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  };


  export const facebookAuth = async (token: string): Promise<GoogleAuthResponse> => {
    try {
      const response = await axios.post("/users/facebook-auth", { token }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  };


  export const emailLogin = async (body: SignupBody): Promise<LoginResponse> => {
    try {
      const response = await axios.post("/users/email-login", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const user = {
          accessToken: response.headers['x-access-token'],
          refreshToken: response.headers['x-refresh-token'],
        };
        await storeLocalStorageData('user', user);
      }
      
      return response;
    } catch (error: any) {
      return error.response;
    }
  };


  export const updateUserImage = async (formData: FormData): Promise<ApiResponse> => {
    try {
      const data = new FormData();

      const imageFile = formData.get('image');
      
      if (imageFile) {
        data.append('image', {
          uri: (imageFile as any).uri,
          type: 'image/jpeg',
          name: 'profile-image.jpg',
        } as any);
      }

      const response = await axios.put("/users/image-upload", data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data, headers) => {
          return data;
        },
      });
      
      return response;
    } catch (error: any) {
      console.error('Image upload error:', error);
      return error.response;
    }
  };



  export const updateProfileFirstime = async (body: Record<string, any>): Promise<ApiResponse> => {
    try {
      const response = await axios.put("/users/first-time-profile-update", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  };


  export const forgotPassword = async (body: { email: string }): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/auth/forgot-password", body);
      return response;
    } catch (error: any) {
      return error.response;
    }
  };


export const userLogout = async (email:string) => {
  try {
    const response = await axios.post("/users/logout", email);
    return response;
    } catch (error: any) {
      return error.response;
      }
}

export const checkUserNameAvailability = async(userName:string) => {
  try {
    const response = await axios.get(`/users/username-confirm?userName=${userName}`);
    return response;
    } catch (error: any) {
      return error.response;
      }
}

export const fetchAllHosts = async() => {
  try {
    const response = await axios.get(`/host/get-all-hosts`);
    return response;
    } catch (error: any) {
      return error.response;
    }
}

export const fetchLiveEvents = async() => {
  try {
    const response = await axios.get(`/users/live-events`);
    return response;
    } catch (error: any) {
      return error.response;
    }
}

export const fetchAllEvents = async() => {
  try {
    const response = await axios.get(`/users/all-events`);
    return response;
    } catch (error: any) {
      return error.response;
    }
}

export const fetchTrendingEvents = async() => {
  try {
    const response = await axios.get(`/users/trending-events`);
    return response;
    } catch (error: any) {
      return error.response;
    }
}
// export const userLogoutForce = async () => {
//   try {
//     const response = await axios.post("/auth/logout");
//     return response;
//     } catch (error: any) {
//       return error.response;
//       }
// }