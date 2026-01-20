"use server";

import { apiPrivate } from "@/instance/axios";
import apiResponse from "@/types/res/response";

export type cartItems = {
  bookId: number;
  quantity: number;
};

export default async function syncCartItems(cartItems: any, token: string) {
  const payload = cartItems.map((item: cartItems) => {
    return { bookId: Number(item.bookId), quantity: item.quantity };
  });
  console.log(payload);
  console.log(token);

  const api = apiPrivate(token);
  try {
    const response = await api.post("/api/cartItems/sync", payload);
    const data = response.data as apiResponse<cartItems>;

    console.log(data);

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
      data: data.data,
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
