import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import { getSubs } from '../../functions/sub';
import Cat from '../../images/Cat.jpeg';

export const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
     getSubs().then(res => {
       if(res.status === 200) {
          setCategories(res.data);
       }
     })
    return () => {
      
    }
  }, [])
  return (
    <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Row gutter = {24} className = ' shop-by-category'>
      {
         categories.length > 0 &&
         categories.map(category => {
           return(
            <Col xs={{ span: 10, offset: 1}} lg={{ span: 8, offset: 3 }}>
            <div className="card bg-dark text-white">
               <Link to = {`/sub/${category.slug}`}>
                 <img src={Cat} className="card-img" width = '400' height = '200' alt="..."/>
                 <div className="card-img-overlay">
                   <h5 className="card-title">{category.name}</h5>
                 </div>
               </Link>
               </div>
            </Col>
           )
         })
      }
        {/* <Col xs={{ span: 10, offset: 1}} lg={{ span: 8, offset: 1 }}>
       <div className="card bg-dark text-white">
         <Link to = '#'>
            <img src={Cat} className="card-img" width = '400' height = '200' alt="..."/>
            <div className="card-img-overlay">
              <h5 className="card-title">New Arrival</h5>
            </div>
            </Link>
          </div>
       </Col>
       <Col xs={{ span: 10, offset: 1}} lg={{ span: 8, offset: 3 }}>
       <div className="card bg-dark text-white">
          <Link to = '#'>
            <img src={Cat} className="card-img" width = '400' height = '200' alt="..."/>
            <div className="card-img-overlay">
              <h5 className="card-title">Shoes</h5>
            </div>
            </Link>
          </div>
       </Col>
       <Col xs={{ span: 10, offset: 1}} lg={{ span: 8, offset: 1 }}>
          <div className="card bg-dark text-white">
          <Link to = '#'> 
            <img src={Cat} className="card-img" width = '400' height = '200' alt="..."/>
            <div className="card-img-overlay">
              <h5 className="card-title">Accessories</h5>
            </div>
            </Link>
          </div>
       </Col> */}
    </Row>
    </div>
  )
}
