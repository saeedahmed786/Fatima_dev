import axios from "axios";

export const createProduct = async (product, token) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, token) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

  export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, 
  {
    sort, 
    order, 
    page,

  });

  export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

  export const productStar = async (productId, star, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`, 
     { star },
      {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

  export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

  export const fetchProductsBySearch = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search/by-text`, {query});
  
  export const fetchProductsByFilter = async (arg) => 
     await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);