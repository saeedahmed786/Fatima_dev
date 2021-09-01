import { MenuOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Slider } from 'antd'
import React from 'react'
import logo from '../../images/Footer//Layer 4@1X.png';

export const MobileNav = () => {
    const menu = (
        <Menu className = 'p-4'>
            <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Sales </span></p>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>New Arrive </span></p>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Most Popular </span></p>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Boys </span></p>
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
                <p className = 'mb-0 pb-0'><span>Accessories </span></p>
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
                
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Sizes </span></p>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>0-3 Months</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>4-12 Months</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>4-7 Years</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span className = 'sub-text'>8-10 Years</span></p>
                 </div>
            {/* </div> */}
        </Menu>
      );

    return (
        <div>
            <div className = 'mt-0'>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                     <MenuOutlined/>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}
