import axios from "axios";

export const getAddress = async (token) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/get-address`,
    {
      headers: {
         authorization : 'Bearer ' + token
      },
    }
  );

export const userCart = async (cart, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
         authorization : 'Bearer ' + token
      },
    }
  );

export const getUserCart = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const emptyUserCart = async (token) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const saveUserAddress = async (token, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );

export const applyCoupon = async (token, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );

export const createOrder = async (stripeResponse, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );

export const getUserOrders = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authorization : 'Bearer ' + token
    },
  });

export const getWishlist = async (token) => 
  // console.log('sajhkjd');
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authorization : 'Bearer ' + token
    },
  });
export const removeWishlist = async (productId, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );

 export const addToWishlist = async (productId, token) => {
  console.log('sCJK');
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authorization : 'Bearer ' + token
      },
    }
  );
 }