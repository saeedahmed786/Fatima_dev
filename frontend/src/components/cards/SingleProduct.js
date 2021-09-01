import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sport from "../../images/sport.jpeg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {addToWishlist} from "../../functions/user";
import { toast } from "react-toastify";
import {useHistory} from 'react-router-dom';

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // router
  let history = useHistory();

  const { title, images, description, _id, price } = product;

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

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
          // show cart items in side drawer
          dispatch({
            type: "SET_VISIBLE",
            payload: true,
          });
        }
      };
      const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
          console.log("ADDED TO WISHLIST", res.data);
          toast.success("Added to wishlist");
          history.push("/user/wishlist");
        });
      };
    
  

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={sport} className="mb-3 w-75 h-75 card-image" />}></Card>
        )}

        {/* <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs> */}
      </div>

      <div className="col-md-5">
        <div className = 'row w-75 title-price' style = {{borderBottom: '1px solid #AE853B'}}>
           <div className = 'col-md-6 col-sm-6'>
           <h4>{title}</h4>
            </div>
           <div className = 'col-md-6 col-sm-6' style = {{textAlign: 'right'}}>
              <h5 className = 'float-right'>{price} SR</h5>
            </div>
        </div>

        <Card
          // actions={[
          //   <Tooltip title={tooltip}>
          //     <a onClick={handleAddToCart}>
          //       <ShoppingOutlined  className="text-danger" /> <br /> Add to
          //       Cart
          //     </a>
          //   </Tooltip>,
          //   <a onClick={handleAddToWishlist}>
          //   <HeartOutlined className="text-info" /> <br /> Add to Wishlist
          // </a>,
          //   <RatingModal>
          //     <StarRating
          //       name={_id}
          //       numberOfStars={5}
          //       rating={star}
          //       changeRating={onStarClick}
          //       isSelectable={true}
          //       starRatedColor="gold"
          //     />
          //   </RatingModal>,
          // ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;