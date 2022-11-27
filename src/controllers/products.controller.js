import productsService from "../services/products.service.js";

const getProducts = (req, res) => {
  try {
    const products = productsService.getProducts();
    res.status(200).send(products);
  } catch (err) {
    throw new Error(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, message, data } = await productsService.getProduct(id);
    res.status(statusCode).send((data && data.product) || { message });
  } catch (err) {
    throw new Error(err);
  }
};

const addProduct = async (req, res) => {
  try {
    const { statusCode, message } = await productsService.addProduct(req.body);
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, message } = await productsService.removeProduct(id);
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, message } = await productsService.editProduct(
      id,
      req.body
    );
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err);
  }
};

const buyProduct = async (req, res) => {
  try {
    const { statusCode, data } = await productsService.buyProduct(req.body);
    res.status(statusCode).send(data);
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
