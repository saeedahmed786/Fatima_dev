import { Col, Row } from 'antd'
import React, { useState } from 'react'
import brand1 from '../../images/Brands/Layer 12@1X.png';
import brand2 from '../../images/Brands/Layer 13@1X.png';
import brand3 from '../../images/Brands/Layer 15@1X.png';
import brand4 from '../../images/Brands/Layer 14@1X.png';
import brand5 from '../../images/Brands/Layer 16@1X.png';
import { useHistory } from 'react-router-dom';

export const PopularBrands = () => {
    const history = useHistory();
    const style = { padding: '8px 0' };

    return (
        <div>
            <Row justify="center" gutter={16}>
                <Col span={4}>
                    <div style={style}>
                        <img src = {brand1} className = 'img-fluid'  alt = 'img'/>
                    </div>
                </Col>
                <Col span = {4}>
                    <div style={style}>
                        <img src = {brand2} className = 'img-fluid'  alt = 'img'/>
                    </div>
                </Col>
                <Col span = {4}>
                    <div style={style}>
                        <img src = {brand4} className = 'img-fluid' alt = 'img'/>
                    </div>
                </Col>
                <Col span = {4}>
                    <div style={style}>
                        <img src = {brand4} className = 'img-fluid'  alt = 'img'/>
                    </div>
                </Col>
                <Col span = {4}>
                    <div style={style}>
                        <img src = {brand5} className = 'img-fluid'  alt = 'img'/>
                    </div>
                </Col>
            </Row>
            <button onClick = {() => history.push('/all-brands')} className = 'btn show-more'>
                Show more
            </button>
        </div>
    )
}
