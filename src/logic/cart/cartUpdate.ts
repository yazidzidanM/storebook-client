"use server";

import { apiPrivate } from "@/instance/axios";

export default async function updateQtyCartItem(
  bookId: number,
  quantity: number,
  token: string,
) {
  const api = apiPrivate(token);
  console.log(bookId)
  console.log(quantity)
  try {
    const response = await api.put(`/api/cartItems/${String(bookId)}`, {quantity});
    const data = response.data;
    console.log(data)

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
