import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import brand1 from '../../images/Brands/Layer 12@1X.png';
import brand2 from '../../images/Brands/Layer 13@1X.png';
import brand3 from '../../images/Brands/Layer 15@1X.png';
import brand4 from '../../images/Brands/Layer 14@1X.png';
import brand5 from '../../images/Brands/Layer 16@1X.png';
import { Link, useHistory } from 'react-router-dom';
import { getBrands } from '../../functions/brand';

export const PopularBrands = () => {
    const history = useHistory();
    const style = { padding: '8px 0' };
    const [brands, setBrands] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = () =>
        getBrands().then((c) => setBrands(c.data));

    return (
        <div>
            <Row justify="center" gutter={16}>
                {
                    !show ?
                    brands.length > 0 && brands.slice(0, 5).map(b => {
                        return (
                            <Col span={4} key={b._id}>
                                <div style={style}>
                                    <Link to = {'/brand/' + b.slug}>
                                    <img src={b.image} className='img-fluid' alt='img' />
                                    </Link>
                                </div>
                            </Col>
                        )
                    })
                    :
                    brands.length > 0 && brands.map(b => {
                        return (
                            <Col span={4} key={b._id}>
                                <div style={style}>
                                    <Link to = {'/brand/' + b.slug}>
                                    <img src={b.image} className='img-fluid' alt='img' />
                                    </Link>
                                </div>
                            </Col>
                        )
                    })

                }
            </Row>
            {
                show ?
                <button onClick={() => setShow(false)} className='btn show-more'>
                   Hide
                </button>
            :
                <button onClick={() => setShow(true)} className='btn show-more'>
                   Show more
                </button>

            }
            
        </div>
    )
}
