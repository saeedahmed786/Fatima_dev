import React from "react";
import ModalImage from "react-modal-image";
import sport from "../../images/sport.jpeg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Select } from 'antd';

const { Option } = Select;


const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
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
      toast.error(`Max available quantity: ${p.quantity}`);
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    // <tbody>
    //   <tr>
    //     <td>
    //       <div style={{ width: "100px", height: "auto" }}>
    //         {p.images.length ? (
    //           <ModalImage small={p.images[0].url} large={p.images[0].url} />
    //         ) : (
    //           <ModalImage small={sport} large={sport} />
    //         )}
    //       </div>
    //     </td>
    //     <td>{p.title}</td>
    //     <td>{p.price} SR </td>
    //     <td>{p.brand}</td>
    //     <td>
    //       <select
    //         onChange={handleColorChange}
    //         name="color"
    //         className="form-control"
    //       >
    //         {p.color ? (
    //           <option value={p.color}>{p.color}</option>
    //         ) : (
    //           <option>Select</option>
    //         )}
    //         {colors
    //           .filter((c) => c !== p.color)
    //           .map((c) => (
    //             <option key={c} value={c}>
    //               {c}
    //             </option>
    //           ))}
    //       </select>
    //     </td>
    //     <td className="text-center">
    //       <input
    //         type="number"
    //         className="form-control"
    //         value={p.count}
    //         onChange={handleQuantityChange}
    //       />
    //     </td>
    //     <td className="text-center">
    //       {p.shipping === "Yes" ? (
    //         <CheckCircleOutlined className="text-success" />
    //       ) : (
    //         <CloseCircleOutlined className="text-danger" />
    //       )}
    //     </td>
    //     <td className="text-center">
    //       <CloseOutlined
    //         onClick={handleRemove}
    //         className="text-danger pointer"
    //       />
    //     </td>
    //   </tr>
    // </tbody>

    // <div className="table-responsive cart">
    //   <table className="table table-borderless">
    //     <thead style={{ borderBottom: '2px solid #A17B14' }}>
    //       <tr>
    //         <th scope="col">Product</th>
    //         <th scope="col">Size</th>
    //         <th scope="col">Quantity</th>
    //         <th scope="col">Total Price</th>
    //       </tr>
    //     </thead>
    //     <tbody>
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
              <Select style={{ width: 80}} onChange={handleChange}>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
            </div>
            </td>
            <td className = ''>
              <div className='quantity mt-5 pt-1'>
                <input type='number' className = 'w-25'/> 
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