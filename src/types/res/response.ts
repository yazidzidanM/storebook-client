type apiResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T[]
  stack?: string
} 

export default apiResponse