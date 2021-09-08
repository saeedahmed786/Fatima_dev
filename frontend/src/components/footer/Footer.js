import React from 'react';
import Logo from '../../images/Footer/Layer 4@1X.png'
import Paypal from '../../images/Footer/paypal_PNG19.png'
import Apay from '../../images/Footer/Apple_Pay-Logo.wine.png'
import Visa from '../../images/Footer/Visa_Inc.-Logo.wine.png'
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className = 'text-center'>
            <Row className = '' style = {{marginLeft: '10%'}}>
              <Col span = {24} md = {4}>
                  <div className = 'float-right'>
                <Link to = '/'>
                  <img className = 'img-fluid' src = {Logo} alt = 'logo'/>
                </Link>  
                   <p className = 'mt-2'>Copyright 2021 © AlGARAWI GROUP.</p>
                  </div>
              </Col>

              <Col span = {24} md = {18}>
                  <div className = 'payments d-flex justify-content-end mt-5'>
                  <div className = 'mt-3'>
                  <img className = 'img-fluid' width = '100' src = {Paypal} alt = 'logo'/>
                  </div>
                  <div>
                  <img className = 'img-fluid' width = '100' src = {Apay} alt = 'logo'/>
                  </div>
                  <div>
                  <img className = 'img-fluid' width = '100' src = {Visa} alt = 'logo'/>
                  </div>
                  </div>
              </Col>
            </Row>  
            <div className = 'border-links text-center'></div>
            <div className = 'bottom-links row' style = {{marginLeft: '10%'}}>
                <div className = 'col-2 col-md-2 col-sm-2 mt-3'>
                 <Link to = '/shop'>Shop All</Link>
                 </div>
                 <div className = 'col-2 col-md-2 col-sm-2 mt-3'>
                 <Link to = '/customer-services'>Customer Services</Link>
                 </div>
                 <div className = 'col-2 col-md-2 col-sm-2 mt-3'>
                 <Link to = '/privacy-policy'>Privacy Policy</Link>
                 </div>
                 <div className = 'col-2 col-md-2 col-sm-2 mt-3'>
                 <Link to = '/delivery'>Delivery</Link>
                 </div>
                 <div className = 'col-2 col-md-2 col-sm-2 mt-3'>
                 <Link to = '/returns/exchanges'>Returns/Exchanges</Link>
                 </div>
                 {/* <div className = 'col-2 col-md-2 col-sm-2 mt-3 d-md-none'>
                 </div> */}
            </div>
        </footer>
    )
}
