import React, { useState } from "react";
import { HeartFilled, HeartOutlined, PlusCircleFilled, ShoppingOutlined } from "@ant-design/icons";
import sport from "../../images/sport.jpeg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";


const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [filled, setFilled] = useState(false);

  // redux
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

  // destructure
  const { images, title, slug, price, _id } = product;



  // Add to WishList
  const handleAddToWishlist = async (id) => {
    window.location.reload();
    console.log(id);
    await addToWishlist(id, localStorage.getItem('token'));
    toast.success('Item added to wishlist');
    setFilled(true);
  }

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3"></div>
      )}
      <div className="card product-card">
      <Link to = {`/product/${slug}`}>
      <img src={images && images.length ? images[0].url : sport} className="card-img-top border" style = {{maxHeight: '100%'}} alt="..."/>
      </Link>
      <div className="card-body p-0 pt-2">
        <div className = 'row'>
          <div className = 'col-md-4 col-sm-4 col-4'>
            <Link>{filled ? <HeartFilled style = {{fontSize: '30px'}}/> : <HeartOutlined onClick = {() => handleAddToWishlist(_id)} style = {{fontSize: '30px'}} />}</Link>
          </div>
          <div className = 'col-md-4 col-sm-4 text-center col-4'>
            <Link>{`${price} SR`}</Link>
          </div>
          <div className = 'col-md-4 col-sm-4 col-4' style = {{textAlign: 'right'}}>
            <Link onClick={handleAddToCart}>
              <div className = 'shopping-bag'>
              <ShoppingOutlined style = {{fontSize: '30px'}} />
              <PlusCircleFilled />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default ProductCard;