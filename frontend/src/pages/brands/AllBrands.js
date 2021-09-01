import React from 'react'
import { Link } from 'react-router-dom'
import image1 from '../../images/All-Brands/AIGNER@1X.png'
import image2 from '../../images/All-Brands/ALONDRA@1X.png'
import image3 from '../../images/All-Brands/BALMAIN@1X.png'
import image4 from '../../images/All-Brands/BIKKIMBERG@1X.png'
import image5 from '../../images/All-Brands/BOSS@1X.png'
import image6 from '../../images/All-Brands/CAMBRASS@1X.png'
import image7 from '../../images/All-Brands/CHLOE@1X.png'
import image8 from '../../images/All-Brands/DKNY@1X.png'
import image9 from '../../images/All-Brands/ELISABETTA FRANCHI@1X.png'

export const AllBrands = () => {
    return (
        <div className='all-brands'>
            <div className='row mt-5 mx-5'>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image1} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}><img src={image2} alt='img' /> </Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image3} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image4} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image5} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image6} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}>  <img src={image7} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image8} alt='img' /></Link>
                </div>
                <div className='col-md-4'>
                    <Link to={`/brand/${'1'}`}> <img src={image9} alt='img' /></Link>
                </div>
            </div>
        </div>
    )
}
