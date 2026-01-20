"use server"

import { apiPrivate } from "@/instance/axios";

export default async function getCartItems(token: string){
  const api = apiPrivate(token);
  try {
    const response = await api.get(`/api/cartItems`);
    const data = response.data

    console.log(data)

    if (data.code === 200) {
      return {
        success: true,
        message: data.message,
        data: data.data,
        error: null,
      };
    }

    return {
      success: false,
      message: data.message,
      data: data,
      error: data.stack || "Unknown error",
    };
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    return {
      success: false,
      message,
      data: {},
      error: `HTTP ${status}: ${message}`,
    };
  }
}