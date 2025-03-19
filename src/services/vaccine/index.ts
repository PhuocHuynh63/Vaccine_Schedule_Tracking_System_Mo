import { axiosClient, axiosPrivate } from "src/config/axios";

const VaccineService = {
    async getAllVaccines(params = {}) {
        return axiosPrivate.get(`/vaccine/search`, { params });
    },

    // Hàm mới: Lấy thông tin vaccine theo ID
    async getVaccineById(id: string) {
        if (!id) {
            throw new Error('Vaccine ID is required');
        }
        return axiosPrivate.get(`/vaccine/${id}`);
    }
};

export default VaccineService;