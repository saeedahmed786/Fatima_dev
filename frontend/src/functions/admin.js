import axios from "axios";

export const getOrders = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
       authorization : 'Bearer ' + token
    },
  });

export const changeStatus = async (orderId, orderStatus, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
         authorization : 'Bearer ' + token
      },
    }
  );