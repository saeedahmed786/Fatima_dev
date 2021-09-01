import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Input, Menu } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ShopOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';
import { Badge } from 'reactstrap';
import { isAuthenticated, logout } from '../../functions/setLoginInfo';
import { MobileNav } from './mobileNav';
import logo from '../../images/Footer//Layer 4@1X.png';
import { fetchProductsByFilter, fetchProductsBySearch } from '../../functions/product';



const { SubMenu, Item } = Menu;

const Header = () => {
  const node = useRef();
  const [current, setCurrent] = useState("home");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {

    setCurrent(e.key);


  };
  console.log(cart.length);

  // const logout = () => {

  //   firebase.auth().signOut ()
  //   dispatch({
  //     type:"LOGOUT",
  //     payload: null,
  //   });

  //   history.push("/login");

  // };

  const menu = (
    <Menu style={{ padding: "10px" }}>
      <Menu.Item key={'2'}>
        <a
          href="/login"
          onClick={(e) => {
            logout(() => { });
          }}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  )

  const handleChange = (e) => {
    fetchProductsBySearch(e.target.value).then(res => {
      setProducts(res.data);
    })
  }

  console.log(products);

  /************************************************** Search Bar and Results ****************************************/
  // const handleClicking = e => {
  //   if (node.current.contains(e.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };


  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClicking);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClicking);
  //   };
  // }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg d-none d-sm-block">
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
                            <Link style={{ fontSize: '13px', color: '#696e79', paddingLeft: '4px' }} to={'/product/' + product.slug}>
                              {product.title}
                            </Link>
                          </li>
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
              <Link to='/user/wishlist'><HeartOutlined /></Link>
              <Link style={{ position: 'relative' }} to='/cart'><ShoppingOutlined />
                <span style={{ background: '#9f780f', color: '#FFFFFF', position: 'absolute', left: '36%', top: '47%', width: '17px', height: '17px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {cart && cart.length}
                </span>
              </Link>
              <div>
                {
                  isAuthenticated() ?
                    <a href='/login' onClick={() => { logout(() => { }) }}><LogoutOutlined /></a>
                    :
                    <Link to='/login'><UserOutlined /></Link>
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
          <img src={logo} alt='logo' />
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