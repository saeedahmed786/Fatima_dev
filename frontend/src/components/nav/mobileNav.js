import { MenuOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Slider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

export const MobileNav = () => {
    const menu = (
        <Menu className = 'p-4'>
            <div className='col-md-8'>
               <Link to = {'/shop'}>
                <p className = 'mb-0 pb-0'><span>Sales </span></p>
                </Link>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
              <Link to = {'/shop'}>
                <p className = 'mb-0 pb-0'><span>New Arrive </span></p>
                </Link>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
              <Link to = {'/shop'}>
                <p className = 'mb-0 pb-0'><span>Most Popular </span></p>
                </Link>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
              <Link to = {'/shop'}>
                <p className = 'mb-0 pb-0'><span>Boys </span></p>
                </Link>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Jackets</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Suits</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Tousers</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Jeans</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Shirts</span></p>
                 </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Brands </span></p>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Jackets</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Suits</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Tousers</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Jeans</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>Shirts</span></p>
                 </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Price Range </span></p>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-12'>
                   <Slider range defaultValue={[20, 50]} />
             </div>
        </Menu>
      );

    return (
        <div>
            <div>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                     {/* <MenuOutlined style = {{fontSize: '36px'}}/> */}
                     <div style = {{marginTop: '-23px'}} >
                      <svg width="60" height="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.991 109 1.019" fill="none" stroke-miterlimit="100" stroke="#9f780f"><svg xmlns="http://www.w3.org/2000/svg" width="109" height="3" viewBox="2 2 107 1"><path paint-order="stroke fill markers" d="M2 3V2h107v1H2z"/></svg></svg><br/>
                      <svg width="60" height="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.991 109 1.019" fill="none" stroke-miterlimit="100" stroke="#9f780f"><svg xmlns="http://www.w3.org/2000/svg" width="109" height="3" viewBox="2 2 107 1"><path paint-order="stroke fill markers" d="M2 3V2h107v1H2z"/></svg></svg><br/>
                      <svg width="60" height="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.991 109 1.019" fill="none" stroke-miterlimit="100" stroke="#9f780f"><svg xmlns="http://www.w3.org/2000/svg" width="109" height="3" viewBox="2 2 107 1"><path paint-order="stroke fill markers" d="M2 3V2h107v1H2z"/></svg></svg>
                     </div>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}
