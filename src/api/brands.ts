// client/src/api/products.js
import axios from "axios";

const BASE_URL = '/api/v1';

// 1) SubCategory: Flower in vases
export const getBrands = async (params?: any) => {
  const res = await axios.get(`${BASE_URL}/brand/lists`);
  return res.data;
};