import React from 'react';
import Logo from '../../images/Footer/Layer 4@1X.png'
import Paypal from '../../images/Footer/paypal_PNG19.png'
import Apay from '../../images/Footer/Apple_Pay-Logo.wine.png'
import Visa from '../../images/Footer/Visa_Inc.-Logo.wine.png'
import { Col, Row } from 'antd';

export const Footer = () => {
    return (
        <footer className = 'text-center mx-5'>
            <Row>
              <Col span = {4}>
                  <div className = 'float-right'>
                  <img className = 'img-fluid' src = {Logo} alt = 'logo'/>
                   <p>Copyright 2021 © AlGARAWI GROUP.</p>
                  </div>
              </Col>

              <Col span = {18}>
                  <div className = 'd-flex justify-content-end mt-5 ml-3'>
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
            <div className = 'border-links'></div>
            <div className = 'bottom-links'>
                 <a href = '#'>Shop All</a>
                 <a href = '#'>Customer Services</a>
                 <a href = '#'>Privacy Policy</a>
                 <a href = '#'>Delivery</a>
                 <a href = '#'>Returns/Exchanges</a>
            </div>
        </footer>
    )
}
