import React from "react";
import { Card } from "antd";
import sport from "../../images/sport.jpeg";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({ product , handleRemove}) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    // <Card
    //   cover={
    //     <img
    //       src={images && images.length ? images[0].url : sport}
    //       style={{ maxHeight: "400px", height: '300px', maxWidth: '100%' }}
    //       className="p-1"
    //     />
    //   }
    //   actions={[
    //   <Link to={`/admin/product/${slug}`}>
    //   <EditOutlined className="text-warning"/> 
    //   </Link>, 
    //   <DeleteOutlined 
    //   onClick = {() => handleRemove(slug)}
    //   className="text-danger"
      
    //   />,
    // ]}
    // >
    //   <Meta
    //    title={title} 
    //   description={`${description && description.substring(0,40)}...`} />
    // </Card>
    <div className = 'shop'>
    <div className="card product-card">
    <Link to = {`/product/${slug}`}>
    <img src={images && images.length ? images[0].url : sport} className="card-img-top border" style = {{maxHeight: '100%'}} alt="..."/>
    </Link>
    <div className="card-body p-0 pt-2">
      <div className = 'd-flex justify-content-around'>
      <Link to={`/admin/product/${slug}`}>
        <EditOutlined className="text-warning"/> 
        </Link>
        <Link>
        <DeleteOutlined
        onClick = {() => handleRemove(slug)}/>
        </Link>
      </div>
    </div>
  </div>
  </div>
  );
};

export default AdminProductCard;