import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Menu, Button } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  HeartOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { isAuthenticated, logout } from '../../functions/setLoginInfo';
import { MobileNav } from './mobileNav';
import logo from '../../images/Footer//Layer 4@1X.png';
import { fetchProductsBySearch } from '../../functions/product';
import { getWishlist } from '../../functions/user';
import { fetchBrandsBySearch } from '../../functions/brand';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Header = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  let { user, cart } = useSelector((state) => ({ ...state }));
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(localStorage.getItem('token')).then((res) => {
      setWishlist(res.data.wishlist);
    });
  }

  const menu = (
    <Menu style={{ padding: "28px", width: '100%' }}>
      <div key={'1'}>
          <Link to = '/login' className="btn mb-3 w-100"style = {{background: 'none', borderRadius: '6px'}}>Login</Link>
       </div>
      <div key={'2'}>
          <Link to = '/register' className="btn w-100 text-white"style = {{background: '#9f780f', borderRadius: '6px'}}>Create new account</Link>
      </div>
    </Menu>
  )

  const menu2 = (
    <Menu style={{ padding: "28px", width: '100%' }}>
      <div key={'1'}>
          <Link to = {isAuthenticated().role === 'admin' ? '/admin/dashboard' : '/user/wishlist'} className="btn mb-3 w-100"style = {{background: 'none', borderRadius: '6px'}}>Dashboard</Link>
       </div>
      <div key={'2'}>
          <Link onClick={() => { logout(() => { document.location.reload()  })} } className="btn w-100 text-white"style = {{background: '#9f780f', borderRadius: '6px'}}>Logout</Link>
      </div>
    </Menu>
  )

  const handleChange = (e) => {
    fetchProductsBySearch(e.target.value).then(res => {
      setProducts(res.data);
    });

    fetchBrandsBySearch(e.target.value).then(res => {
      setBrands(res.data);
    })
  }

  console.log(products);

  return (
    <div>
      <nav className="navbar navbar-expand-lg d-none d-sm-block pb-3">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">EN | AR</a>
              </li>
              <li className = 'nav-item item2'>
                <div className=" dropdown">
                  <Input onChange={handleChange} className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" placeholder="Search here..."/>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                      products.length > 0 ? products.map(product => {
                        return (
                          <li className='dropdown-item' key={product._id}>
                            <a style={{ fontSize: '13px', color: '#696e79', paddingLeft: '4px' }} href={'/product/' + product.slug}>
                              {product.title}
                            </a>
                          </li>
                        )
                      })
                      :
                      brands.length > 0 ? brands.map(brand => {
                        return (
                          <>
                          <li className='dropdown-item' key={brand._id}>
                            <a style={{ fontSize: '13px', color: '#696e79', paddingLeft: '4px' }} href={'/brand/' + brand.slug}>
                              {brand.name}
                            </a>
                          </li>
                          </>
                        )
                      })
                        :
                        <div className='px-2 py-2'>
                          No search results!
                        </div>
                    }
                  </ul>
                </div>
              </li>
           
            </ul>
            <div className="d-flex nav-icons">
              <Link style={{ position: 'relative' }} to='/user/wishlist'><HeartOutlined />
                <span style={{ background: '#9f780f', color: '#FFFFFF', position: 'absolute', left: '36%', top: '47%', width: '17px', height: '17px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {wishlist && wishlist.length}
                </span>
              </Link>
              <Link style={{ position: 'relative' }} to='/cart'><ShoppingOutlined />
                <span style={{ background: '#9f780f', color: '#FFFFFF', position: 'absolute', left: '36%', top: '47%', width: '17px', height: '17px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {cart && cart.length}
                </span>
              </Link>
              <div>
                {
                  isAuthenticated() ?
                    // <a href='/login' onClick={() => { logout(() => { }) }}><LogoutOutlined /></a>
                    <Dropdown overlay={menu2}>
                      <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                         <UserOutlined/>
                      </Link>
                    </Dropdown>
                    :
                    <Dropdown overlay={menu}>
                      <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                         <UserOutlined/>
                      </Link>
                    </Dropdown>
                }
              </div>
              <div className='float-right'>
                <div id="google_translate_element"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className='p-4 d-flex justify-content-between d-block d-sm-none mb-5'>
        <div>
        <Link to = '/'>
          <img src={logo} alt='logo' width = '64' className = 'mt-4'/>
         </Link> 
        </div>
        <div className='mt-5'>
          <MobileNav />
        </div>
      </div>
    </div>
  );


};
// B8912C

export default Header;