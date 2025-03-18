import { axiosClient, axiosPrivate } from "src/config/axios";

const VaccineService = {
    async getAllVaccines(params = {}) {
        return axiosPrivate.get(`/vaccine/search`, { params });
    }
};

export default VaccineService;