// const { httpService } = require("./initilzehttpService");
import { httpService } from "./initilzehttpService";

export const dataService = {
  getAllProducts: () => {
    return httpService.get(`/getAllProducts`).then((result) => {
      return result.data;
    });
  },
  getAllOrder: (vendorId) => {
  return httpService.get(`/vendor/vendorOrders/${vendorId}`).then((result) => {
      return result.data;
    });
  },
  saveProduct: (productData) => {
    return httpService.post(`/saveProduct`, productData).then((result) => {
      return result.data;
    });
  },
  getProductById: (productId) => {
    return httpService.get(`/getProductById/${productId}`).then((result) => {
      return result.data;
    });
  },
};
