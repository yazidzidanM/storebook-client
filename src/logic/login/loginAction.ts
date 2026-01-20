"use server"

import { apiPrivate, apiPublic } from "@/instance/axios";
import { apiResponse, auth } from "@/types/res/response";
import { LoginSchema } from "@/validation/login";

export default async function loginAction(payload: any) {
  const validated = LoginSchema.safeParse(payload);
  if (!validated.success) {
    return {
      success: false,
      data: {},
      error: validated.error,
    };
  }

  try {
    const response = await apiPublic.post("/api/auth/login", payload);
    const data = response.data as apiResponse<auth>;

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

