import React from "react";
import { Card } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sport from "../../images/sport.jpeg";
import ProductListItems from "./ProductListItems";
import _ from "lodash";

// this is children component of Product page
const SingleProduct = ({ product }) => {

  const { title, images, price } = product;

  return (
    <>
      <div className="col-md-7 single-product">
        {images && images.length ? (
          <Carousel showArrows={true} infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={sport} className="mb-3 w-50 h-100 card-image" />}></Card>
        )}
      </div>

      <div className="col-md-5">
        <div className = 'row w-md-75 w-auto title-price' style = {{borderBottom: '1px solid #AE853B'}}>
           <div className = 'col-md-6 col-sm-6 col-6'>
           <h4>{title}</h4>
            </div>
           <div className = 'col-md-6 col-sm-6 col-6' style = {{textAlign: 'right'}}>
              <h5 className = 'float-right'>{price} SR</h5>
            </div>
        </div>

        <Card>
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;