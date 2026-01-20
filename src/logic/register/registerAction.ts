"use server"

import { apiPublic } from "@/instance/axios";
import { apiResponse, auth } from "@/types/res/response";
import { RegisterSchema } from "@/validation/register";


export default async function registerAction(payload: any) {
  const validated = RegisterSchema.safeParse(payload);
  if (!validated.success) {
    return {
      success: false,
      data: {},
      error: validated.error,
    };
  }

  try {
    const response = await apiPublic.post("/api/auth/register", payload);
    const data = response.data as apiResponse<auth>;

    if (data.code === 201) {
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

