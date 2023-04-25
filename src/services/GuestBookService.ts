import { axiosClient } from "@/api/axiosClient";

class GuestBookService {
  async getAll(): Promise<any> {
    try {
      const res = await axiosClient.get("/guest-books?sort[id]=DESC");
      return res?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new GuestBookService();
