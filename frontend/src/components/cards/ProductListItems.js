import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Select } from 'antd';
import _ from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const { Option } = Select;

const ProductListItems = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  function handleChange(value) {
    console.log(`selected ${value}`);
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
        count: 1,
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
  return (
    // <ul className="list-group">
    //   <li className="list-group-item">
    //     Price{" "}
    //     <span className="label label-default label-pill float-xs-right ">
    //       SR {price}
    //     </span>
    //   </li>

    //   {category && (
    //     <li className="list-group-item">
    //       Category{" "}
    //       <Link
    //         to={`/category/${category.slug}`}
    //         className="label label-default label-pill float-xs-right"
    //       >
    //         {category.name}
    //       </Link>
    //     </li>
    //   )}

    //   {subs && (
    //     <li className="list-group-item">
    //       Sub Categories
    //       {subs.map((s) => (
    //         <Link
    //           key={s._id}
    //           to={`/sub/${s.slug}`}
    //           className="label label-default label-pill pull-xs-right"
    //         >
    //           {s.name}
    //         </Link>
    //       ))}
    //     </li>
    //   )}

    //   <li className="list-group-item">
    //     Shipping{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {shipping}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Color{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {color}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Brand{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {brand}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Available{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {quantity}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Sold{" "}
    //     <span className="label label-default label-pill pull-sm-right">
    //       {sold}
    //     </span>
    //   </li>
    // </ul>

    <div className = 'product-details w-50'>
        <div className = 'select-portion'>
         <span className = 'tag'>Color</span>
        <Select defaultValue="Please Choose..." style={{ width: 141 }} onChange={handleChange}>
          <Option value="White">White</Option>
          <Option value="Black">Black</Option>
          <Option value="Yellwo">Yellwo</Option>
          <Option value="Orange">Orange</Option>
        </Select>
        </div>
        <div className = 'select-portion'>
        <span className = 'tag'>Sizes </span>
        <Select defaultValue="Please Choose..." style={{ width: 141 }} onChange={handleChange}>
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
        </Select>
        </div>
        <div className = 'quantity mb-4'>
           <input type = 'number'/> <button className = 'btn' onClick = {handleAddToCart}>
               Add to cart
           </button>
        </div>
        <hr/>
        <div className = 'description mt-2'>
            <h4>Description</h4>
            <p>
              Lorem Ipsuumnsabfnasbfasmbnf asjkfjhfh kjwfhkawf kwfjkwf jkwhfwf 
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