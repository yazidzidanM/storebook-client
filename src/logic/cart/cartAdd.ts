"use server"

import { apiPrivate } from "@/instance/axios";

export default async function cartItemAdd(bookId: number, token: string){
  const api = apiPrivate(token);
  const payload = {
    bookId: bookId,
    quantity: 1
  }
  try {
    const response = await api.post(`/api/cartItems`, payload);
    const data = response.data

    if (data.code === 200) {
      return {
        success: true,
        message: data.message,
        data: data,
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