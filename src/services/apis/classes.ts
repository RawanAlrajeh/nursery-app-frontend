import axios from "axios";

interface CreateClassPayload {
  name: string;
  year: number;
  babysitterId: number;
}

export const classApis = {
  getAll: async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}classes`);
    return response.data;
  },
  
  create: async (payload: CreateClassPayload, token: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}classes`,
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
