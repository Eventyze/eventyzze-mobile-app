import { storeLocalStorageData } from '../../axiosSetup/storage';
import axios from '../../axiosSetup/axios';


interface CreateEventProps {
    image: Record<string, any>;
    video: Record<string, any>;
    eventTitle: string;
    description: string;
    date: string;
    startTime: string;
    duration: string;
    cost: string;
}

interface ApiResponse {
    status: number;
    data: {
      data?: Record<string, any>;
      message?: string;
      [key: string]: any;
    };
  }

export const createEvent = async (body: CreateEventProps): Promise<ApiResponse> => {
    try {
      const response = await axios.post("/host/create-event", body, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return response;
    } catch (error:any) {
      return error.response;
    }
  };