import { HeartOutlined, LogoutOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthenticated, logout } from '../../functions/setLoginInfo'
import { getWishlist } from '../../functions/user'

export const MobileBottomNav = () => {
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
    return (
        <div className = 'd-block d-sm-none'>
        <div className='mobile-bottom-dash pb-1'>
            <div>
            <Link style={{ position: 'relative' }} to='/user/wishlist'><HeartOutlined />
                <span style={{ background: '#9f780f', color: '#FFFFFF', position: 'absolute', left: '36%', top: '47%', width: '17px', height: '17px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {wishlist && wishlist.length}
                </span>
              </Link>
            </div>
            <div>
            <Link style={{ position: 'relative' }} to='/cart'><ShoppingOutlined />
                <span style={{ background: '#9f780f', color: '#FFFFFF', position: 'absolute', left: '36%', top: '47%', width: '17px', height: '17px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {cart && cart.length}
                </span>
              </Link>
            </div>
            <div>
            {
                  isAuthenticated() ?
                    <a href='/login' onClick={() => { logout(() => { }) }}><LogoutOutlined /></a>
                    :
                    <Dropdown placement="topCenter" overlay={menu}>
                      <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                         <UserOutlined/>
                      </Link>
                    </Dropdown>
                }
            </div>
        </div>
        </div>
    )
}
