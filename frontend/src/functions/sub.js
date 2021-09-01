import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const updateSub = async (slug, sub, token) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const createSub = async (sub, token) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });