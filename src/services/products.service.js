import store from "../store/index.js";
import productModel from "../db/models/product.model.js";
import config, { stripe } from "../config/config.js";

const getProducts = () => {
  try {
    return store.getState().products;
  } catch (err) {
    throw new Error(err);
  }
};

const getProduct = async (id) => {
  try {
    if (!id) return { statusCode: 403, message: "The product id must be" };
    const product = await productModel.findById(id);
    return {
      statusCode: 200,
      data: {
        product,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
};

const addProduct = async (product) => {
  try {
    if (!product)
      return { statusCode: 422, message: "The product data must be" };
    const { title, price, description, image_url } = product;
    const newProduct = new productModel({
      title,
      price,
      description,
      image_url,
    });
    await newProduct.save();
    return {
      statusCode: 201,
      message: "The product has been added",
    };
  } catch (err) {
    throw new Error(err);
  }
};

const removeProduct = async (id) => {
  try {
    if (!id) return { statusCode: 403, message: "The id must be" };
    await productModel.findByIdAndRemove(id);
    return {
      statusCode: 200,
      message: "The product has been deleted",
    };
  } catch (err) {
    throw new Error(err);
  }
};

const editProduct = async (id, productData) => {
  try {
    if (!productData || !id)
      return { statusCode: 400, message: "The productData and id must be" };
    const { title, price, description } = productData;
    const product = await productModel.findById(id);
    product.title = title;
    product.price = price;
    product.description = description;

    await product.save();
    return {
      statusCode: 200,
      message: "The product has been edited",
    };
  } catch (err) {
    throw new Error(err);
  }
};

const buyProduct = async (product) => {
  try {
    const {
      stripeConfig: {
        payment_method_types,
        mode,
        success_url,
        cancel_url,
        currency,
      },
    } = config;

    const { name, price, quantity } = product;

    const payment = await stripe.checkout.sessions.create({
      payment_method_types,
      mode,
      success_url,
      cancel_url,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name,
            },
            unit_amount: price,
          },
          quantity,
        },
      ],
    });

    return {
      statusCode: 200,
      data: {
        payment_url: payment.url,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getProducts,
  getProduct,
  addProduct,
  removeProduct,
  editProduct,
  buyProduct,
};
