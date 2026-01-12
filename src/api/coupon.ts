import axios from "axios"

const BASE_URL = 'https://crunchy-cookies-dashboard-wine.vercel.app/api/v1';

export const checkCoupon = async (payload: any) => {
    try {
        const res = await axios.post(`${BASE_URL}/coupon/check`, payload);
        return res.data;
    } catch (error) {
    }
}