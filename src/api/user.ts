import axios from "axios";

const BASE_URL = 'https://crunchy-cookies-dashboard-wine.vercel.app/api/v1';

export const updateUser = async (userDetail: any, userId: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/user/update/${userId}`, userDetail);
        return response.data;
    } catch (error) {
    }
}