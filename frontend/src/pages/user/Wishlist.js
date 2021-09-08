import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Select } from "antd";
import sport from "../../images/sport.jpeg";
import _ from "lodash";
import { toast } from "react-toastify";


const Option = Select;

const Wishlist = () => {
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState('Click to add');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(localStorage.getItem('token')).then((res) => {
      setWishlist(res.data.wishlist);
    });
  }
  const handleRemove = (productId) =>
    removeWishlist(productId, localStorage.getItem('token')).then((res) => {
      loadWishlist();
    });

    const handleAddToCart = (product) => {
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
    <div className="container-fluid mt-5 pt-5 wishlist">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <div className="table-responsive cart">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Size</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {wishlist && wishlist.length > 0 && wishlist.map((p) => (
            // <div key={p._id} className="alert alert-secondary">
            //   <Link to={`/product/${p.slug}`}>{p.title}</Link>
            //   <span
            //     onClick={() => handleRemove(p._id)}
            //     className="btn btn-sm float-right"
            //   >
            //     <DeleteOutlined className="text-danger" />
            //   </span>
            // </div>
            <tr key = {p._id} className = 'mb-4'>
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
              <Select style={{ width: 80}}>
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
                  <h4><CloseOutlined onClick = {() => handleRemove(p._id)}/></h4>
               </div>
             </td>
            <td>
               <div className = 'mt-5 pt-0'>
                  <button className = 'btn' style = {{background: '#9f780f', color: 'white'}} onClick = {() => handleAddToCart(p)}>Add to cart</button>
               </div>
             </td>
          </tr>

          ))}
        </tbody>
      </table>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;