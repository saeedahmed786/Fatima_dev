import React, { useState } from "react";
import sport from "../../images/sport.jpeg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CloseOutlined
} from "@ant-design/icons";
import { Select } from 'antd';

const { Option } = Select;


const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch();

  const handleSizeChange = (value) => {
    console.log("color changed", value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].size = value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Product out of stock.`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
          <tr>
            <td className='d-flex'>
              {
                p.images.length ? (
                  <img width='141' height='141' className='border' src={p.images[0].url} />
                ) : (
                  <img width='141' height='141' className='border' src={sport} />
                )
              }
              <span className='mt-5' style={{ marginLeft: '10px' }}>
                <span><h6 className = 'pb-0 mb-0'>{p.title} </h6></span>
                <span>{p.description}</span>
              </span>
            </td>
            <td>
            <div className=' mt-5 pt-1'>
              <Select style={{ width: 80}} defaultValue = {p.size} onChange={handleSizeChange}>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
            </div>
            </td>
            <td className = ''>
              <div className='quantity mt-5 pt-1'>
                <input value = {p.count} type='number' onChange = {handleQuantityChange} className = 'w-75'/> 
              </div>
            </td>
            <td>
               <div className = 'mt-5 pt-1'>
                  <h4>{p.price} SR</h4>
               </div>
              </td>
            <td>
               <div className = 'mt-5 pt-0'>
                  <h4><CloseOutlined onClick={handleRemove}/></h4>
               </div>
             </td>
          </tr>
  );
};

export default ProductCardInCheckout;