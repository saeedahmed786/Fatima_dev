import React from 'react';
import logokids from "../../images/logokids.jpg";
import { MenuOutlined, MobileFilled } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd';
import Slider from '@ant-design/react-slick';
import { MobileNav } from './mobileNav';


export const SecondNav = (props) => {
    return (
        <>
        <div className = 'd-none d-sm-block'>
            <div>
                <div>
                    <img src={props.logo ? props.logo : logokids} width={props.logo ? 483 : 541} />
                </div>

                <div className='second-nav'>
                    <div>
                    <a href="#" className="">
                        الأولاد
                    </a>
                    <a href="#" className="">
                        البنات
                    </a>
                    <a href="#" className="">
                        مواليد
                    </a>
                    <a href="#" className="">
                        وصل حديثا
                    </a>
                    <a href="#" className="">
                        ماركات
                    </a>
                    <a href="#" className="">
                        تخفيضات
                    </a>
                </div>
                </div>
            </div>
        </div>
      </>
    )
}
