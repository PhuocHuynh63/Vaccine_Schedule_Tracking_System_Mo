import { axiosClient } from "src/config/axios";

const UserService = {
    async isEmailExists(email: string) {
        return axiosClient.post(`/user/check-email`, { email });
    },
    async login(data: MODELS.IUser) {
        return axiosClient.post(`/auth/login`, data);
    }
}

export default UserService;