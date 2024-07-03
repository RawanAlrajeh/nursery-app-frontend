import axios from "axios";

interface CreateBabysitterPayload {
  full_name: string;
  age: number;
  mobile: string;
  idNumber: string;
  email: string;
}

export const babysitterApis = {
  getAll: async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}babysitters`);
    return response.data;
  },
  
  create: async (payload: CreateBabysitterPayload, token: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}babysitters`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
