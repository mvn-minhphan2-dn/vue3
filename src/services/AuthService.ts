import { axiosClient } from "@/api/axiosClient";
import { saveToken } from "@/helpers/auth.helper";

class AuthService {
  async login(payload: any): Promise<any> {
    try {
      const res = await axiosClient.post<any, any>("/auth/local", payload);
      saveToken(res?.jwt);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new AuthService();
