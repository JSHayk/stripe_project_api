// Collections
import product from "../db/collections/product/product.collection.js";

// State
let products = [];

function getState() {
  return {
    products,
  };
}

async function sync() {
  try {
    products = await product.getProducts();
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  getState,
  sync,
};
