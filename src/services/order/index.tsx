import { axiosPrivate } from "src/config/axios";

const OrderService = {
    async createOrder(orderData) {
        return axiosPrivate.post("/order", orderData);
    },

    async getOrderById(orderId) {
        return axiosPrivate.get(`/order/${orderId}`);
    }
};

export default OrderService;
