import React, { useEffect, useState } from "react";
// import Jumbotron from "../components/cards/Jumbotron";
import BestSellers, { ShopByCategory } from "../components/home/ShopByCategory";
import Rectangle1 from "../images/Rectangle 1.png";
import Rectangle2 from "../images/Rectangle 2.png";
import Rectangle from "../images/Rectangle .png";
import { SecondNav } from "../components/nav/SecondNav";
import { MostPopular } from "../components/home/MostPopular";
import { PopularBrands } from "../components/home/PopularBrands";


const Home = () => {
  return (
    <>
      <div className="container homepage jumbotron font-weight-bold text-center cell home">
        <div>
          <SecondNav />
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={Rectangle1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Rectangle2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Rectangle} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className='category-area'>
            <div>
              <h4 className=" font-home p-3 mt-5 mb-5 display-5 jumbotron cell">
                Shop By Category
              </h4>
              <ShopByCategory />
            </div>
          </div>
          <div className='most-popular-area'>
            <div>
              <h4 className=" font-home p-3 mt-5 mb-5 display-5 jumbotron cell">
                Most Popular
              </h4>
              <MostPopular />
            </div>
          </div>
          <div className='popular-brand'>
            <div>
              <h4 className=" font-home p-3 mt-5 mb-5 display-5 jumbotron cell">
                 Popular Brand
              </h4>
              <PopularBrands />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;