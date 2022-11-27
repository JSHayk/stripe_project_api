import productModel from "../../models/product.model.js";

const getProducts = async () => {
  try {
    return await productModel.find({});
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getProducts,
};
