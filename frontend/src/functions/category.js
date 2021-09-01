import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authorization : 'Bearer ' + token
    },
  });

export const updateCategory = async (slug, category, token) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authorization : 'Bearer ' + token
    },
  });

export const createCategory = async (category, token) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authorization : 'Bearer ' + token
    },
  });

  export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);