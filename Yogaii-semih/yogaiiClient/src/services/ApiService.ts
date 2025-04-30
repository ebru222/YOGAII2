import axios from 'axios';

const API_BASE_URL = 'https://localhost:7066/api'; // Adjust port as needed

export interface YogaPose {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  modelUrl: string;
  confidence?: number;
}

export interface YogaPosePrediction {
  predictedPose: YogaPose;
  confidence: number;
  timestamp: string;
  allPredictions: Record<string, number>;
}

class ApiService {
  async getAllPoses(): Promise<YogaPose[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/YogaPose`);
      return response.data;
    } catch (error) {
      console.error('Error fetching poses:', error);
      throw error;
    }
  }

  async getPoseByName(name: string): Promise<YogaPose> {
    try {
      const response = await axios.get(`${API_BASE_URL}/YogaPose/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pose ${name}:`, error);
      throw error;
    }
  }

  async predictPose(imageBase64: string): Promise<YogaPosePrediction> {
    try {
      const response = await axios.post(`${API_BASE_URL}/YogaPose/predict`, {
        imageBase64
      });
      return response.data;
    } catch (error) {
      console.error('Error predicting pose:', error);
      throw error;
    }
  }
}

export default new ApiService();