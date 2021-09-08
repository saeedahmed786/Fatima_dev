import React, { useState } from "react";
import { Select } from 'antd';
import _ from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const { Option } = Select;

const ProductListItems = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [count, setCount] = useState('');

  function handleColorChange(value) {
    product.color = value
  }

  function handleSizeChange(value) {
    product.size = value
  }

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      toast.success("Item added to cart");
    }
  };

  console.log(product)
  const handleQChange = (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);

    if (count > product.quantity) {
      toast.error(`Product out of stock.`);
      return;
    }
  }

  return (
    <div className = 'product-details'>
        <div className = 'select-portion'>
         <span className = 'tag'>Color</span>
        <Select defaultValue="Please Choose..." style={{ width: 141 }} onChange={handleColorChange}>
          <Option value="White">White</Option>
          <Option value="Black">Black</Option>
          <Option value="Yellwo">Yellow</Option>
          <Option value="Orange">Orange</Option>
          <Option value="Orange">Pink</Option>
          <Option value="Orange">Red</Option>
        </Select>
        </div>
        <div className = 'select-portion'>
        <span className = 'tag'>Sizes </span>
        <Select defaultValue="Please Choose..." style={{ width: 141 }} onChange={handleSizeChange}>
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
          <Option value="XL">XXL</Option>
        </Select>
        </div>
        <div className = 'quantity mb-4 d-flex'>
           <input type = 'number' value = {count} onChange = {handleQChange}/> 
            <button className = 'btn' style = {{minWidth: '130px'}} onClick = {handleAddToCart}>
               Add to cart
           </button>
        </div>
        <hr/>
        <div className = 'description mt-2 w-100'>
            <h4>Description</h4>
            <p>
              {product.description}
            </p>
        </div>
        <hr className = ''/>
        <div>
           <h4>
              Additional Information
           </h4>
           <p>
             Fabric :
           </p>
           <p>
             Quality :
           </p>
        </div>
    </div>
  );
};

export default ProductListItems;