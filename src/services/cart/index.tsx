import { axiosPrivate } from "src/config/axios";

const CartService = {
  async createCart(userId, vaccineIds) {
    if (!userId || !Array.isArray(vaccineIds) || vaccineIds.length === 0) {
      throw new Error("User ID và danh sách Vaccine ID là bắt buộc");
    }
    return axiosPrivate.post("/cart", {
      user: userId,
      vaccine: vaccineIds,
    });
  },

  async getCartByUserId(userId, status = false) {
    if (!userId) {
      throw new Error("User ID là bắt buộc");
    }
    return axiosPrivate.get(`/cart/${userId}/${status}`);
  },

  async updateCartStatus(userId) {
    if (!userId) {
      throw new Error("User ID là bắt buộc");
    }
    return axiosPrivate.patch(`/cart/${userId}/status`);
  },

  async removeCart(userId, vaccineIds) {
    if (!userId || !Array.isArray(vaccineIds) || vaccineIds.length === 0) {
      throw new Error("User ID và danh sách Vaccine ID là bắt buộc");
    }
    return axiosPrivate.put("/cart/remove-cart", {
      user: userId,
      vaccine: vaccineIds,
    });
  }
};

export default CartService;
