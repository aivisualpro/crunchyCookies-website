import axios from "axios"

const BASE_URL = '/api/v1';

export const checkCoupon = async (payload: any) => {
    try {
        const res = await axios.post(`${BASE_URL}/coupon/check`, payload);
        return res.data;
    } catch (error) {
    }
}