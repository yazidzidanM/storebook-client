export type apiResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T[]
  stack?: string
} 


export type auth = {
  user: {
    uuid: string;
    name: string;
    username: string;
    role: string;
  };
  cartId: number;
  access_token: string;
};