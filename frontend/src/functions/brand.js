import axios from "axios";


export const createBrand= async (brand, imageUrl, publicId, token) => {
  await axios.post(`${process.env.REACT_APP_API}/brand`, {brand, imageUrl, publicId, token}, {
    headers: {
      authorization : 'Bearer ' + token
    }
  });
}
export const getBrands = async () =>
  await axios.get(`${process.env.REACT_APP_API}/brands`);

export const getBrand= async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/brand/${slug}`);

export const removeBrand= async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/brand/${slug}`, {
    headers: {
      authorization : 'Bearer ' + token
    },
  });

export const updateBrand= async (slug, name, imageUrl, publicId, token) => {
    await axios.put(`${process.env.REACT_APP_API}/brand/${slug}`, {slug, name, imageUrl, publicId}, {
        headers: {
        authorization : 'Bearer ' + token
        },
    });
}

export const fetchBrandsBySearch = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-brand/by-text`, {query});
