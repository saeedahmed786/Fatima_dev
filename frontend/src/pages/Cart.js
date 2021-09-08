import { Col, Input, Radio, Row, Select } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { saveUserAddress, userCart } from "../functions/user";
import ship1 from '../images/Shipping/FedEx.png';
import ship2 from '../images/Shipping/DHL.png';
import ship3 from '../images/Shipping/Eagle.png';
import { toast } from "react-toastify";

const Option = Select;
const Cart = ({ history }) => {
  const [addressSaved, setAddressSaved] = useState(false);
  const [address, setAddress] = useState({
     email: '',
     phone: '',
     fullAddress: '',
     city: '',
     country: ''
  });
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, localStorage.getItem('token'))
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <div className="table-responsive cart">
    <table className="table table-borderless">
      <thead style={{ borderBottom: '2px solid #A17B14' }}>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Size</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total Price</th>
        </tr>
      </thead>
      <tbody>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </tbody>
   </table> 
   </div>
  );


  //Address Change 
  const handleChange = (e) => {
     setAddress({
       ...address,
       [e.target.name]: e.target.value
     })
  }

  const saveAddressToDb = (e) => {
    e.preventDefault();
    // console.log(address);
    let makeAddress = `${address.fullAddress}, ${address.city}, ${address.country}, ${address.phone}`;
    saveUserAddress(localStorage.getItem('token'), makeAddress).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  console.log(address);

  return (
    <div className="container pt-2 cart">
      <div className="row">
        <div className="col-lg-8">
          <div style = {{borderBottom: '2px solid #A17B14'}}>
          <h4>Your Cart</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className = 'mt-2 p-2'>
         <h4>Shipping Method</h4>
         <Row>
           <Col span = {8}>
               <img src = {ship1} width = '110' alt = 'shipping'/>
               <h6 className = 'mt-1 mb-0'>FedEx</h6>
               <p className = 'pt-0'>Lorem Ipsium</p>
                <input className = 'checkbox' type = 'radio' name="someCoolName" value="one"/>
           </Col>
           <Col span = {8}>
             <img src = {ship2} width = '100' alt = 'shipping'/>
             <h6 className = 'mt-1 mb-0'>DHL</h6>
               <p className = 'pt-0'>Lorem Ipsium</p>
                <input className = 'checkbox' type = 'radio' name="someCoolName" value="two"/>
           </Col>
           <Col span = {8}>
              <img src = {ship3} width = '110' alt = 'shipping'/>
              <h6 className = 'mt-1 mb-0'>Fastio</h6>
               <p className = 'pt-0'>Lorem Ipsium</p>
               <input className = 'checkbox' type = 'radio' name="someCoolName" value="three"/>
           </Col>
         </Row>
         <div className="row" style = {{borderBottom: '2px solid #A17B14', paddingBottom: '32px'}}>
        <div className="col-md-9">
          <form className="needs-validation" novalidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="validationCustom01">First name: <span className='sta mt-5r'>*</span></label>
                <input type="text" className="form-control" id="validationCustom01" />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom02">Last name: <span>*</span></label>
                <input type="text" className="form-control" id="validationCustom02" />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="validationCustom03">City: <span>*</span></label>
                <input type="text" name = "city" className="form-control" id="validationCustom03" onChange = {handleChange} required />
                <div className="invalid-feedback">
                  Please provide a valid city.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom03">Country: <span>*</span></label>
                <input type="text" name = "country" className="form-control" id="validationCustom03" onChange = {handleChange} required />
                <div className="invalid-feedback">
                  Please provide a valid Country.
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <label for="validationCustom01">Address Line: <span>*</span></label>
                <input type="text" name = "fullAddress" className="form-control" id="validationCustom01" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom02">Phone Number: <span>*</span></label>
                <input type="number" name = "phone" className="form-control" id="validationCustom02" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom02">Email: <span>*</span></label>
                <input type="text" name = 'email' className="form-control" id="validationCustom02" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className = 'mt-2'>
                <button type="submit" className="btn w-100" style = {{background: '#9f780f', color: 'white'}} onClick = {saveAddressToDb}>Save this address</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className = 'd-flex justify-content-center mt-4 total-calc'>
        <div>
          <Row gutter = {[8, 20]}>
              <Col span = {12}>
                Subtotal
              </Col>
              <Col span = {12}>
                    {cart.map((c, i) => (
                  <div key={i}>
                    <span>
                      {c.title} x {c.count} =  {c.price * c.count} SR
                    </span>
                  </div>
                ))}
              </Col>
              <Col span = {12}>
                Shipping
              </Col>
              <Col span = {12}>
                Free
              </Col>
              <Col span = {12}>
                Tax
              </Col>
              <Col span = {12}>
                {cart.length > 0 ? <span>{15 * getTotal() / 100} SR</span> : 0} 
              </Col>
              <Col span = {22} style = {{borderBottom: '2px solid #A17B14', marginLeft: '6px'}}></Col>
              <Col span = {12} className = 'total'>
                Total
              </Col>
              <Col span = {12} className = 'total'>
                  {getTotal() + 15 * getTotal() / 100} SR
              </Col>
          </Row>
          </div>  
      </div>
        </div>
        </div>
        <div className="col-lg-4">
          {/* <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} =  {c.price * c.count} SR
              </p>
            </div>
          ))}
          <hr />
          Total: <b>{getTotal()} SR </b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )} */}
          <div style = {{ background: '#f0f0f0'}}>
          <div className = 'p-4 pb-0 side-payment'>
          <h4 className = ''>Payment Method</h4>
          <div className = ''>
            <span style={{ marginRight: '15px' }}>
            <input className = 'checkbox' type = 'radio' name="othername" value="1"/>
            </span>
            <span>
            <i class="fab fa-cc-visa"></i><span style = {{marginLeft: '6px'}}>Credit Card</span>
            </span>
          </div>
          <div className = ' mr-5' style = {{marginRight: '5px', marginTop: '17px'}}>
            <span style={{ marginRight: '17px' }}>
            <input className = 'checkbox' type = 'radio' name="othername" value="2"/>
            </span>
            <span>
            <i className="fab fa-paypal text-dark mr-4"></i><span style = {{marginLeft: '6px'}}>Paypal</span>
            </span>
          </div>
          <div className='inputs mt-4'>
            <div>
              <label for="validationCustom01">Name on Card : <span className='sta mt-5r'>*</span></label>
              <input type="text" className="form-control" id="validationCustom01" required />
            </div>
            <div className = 'mt-2'>
              <label for="validationCustom01">Card Number : <span className='sta mt-5r'>*</span></label>
              <input type="text" className="form-control" id="validationCustom01" required />
            </div>
          </div>
          <div className = 'small-inputs'>
          <div className='row mt-5 pt-1 credit-card'>
            <div className = 'col-md-8'>
              <span className = 'tag'>
                Expiration Date:
              </span>
              <br/>
              <Input style = {{width: 60}} className = 'number' type = 'number'/>
              <span style = {{marginLeft: '23px'}}>
              <Select style={{ width: 60}}>
                <Option value="S">1</Option>
                <Option value="M">2</Option>
                <Option value="L">3</Option>
                <Option value="XL">4</Option>
                <Option value="XL">5</Option>
                <Option value="XL">6</Option>
                <Option value="XL">7</Option>
                <Option value="XL">8</Option>
                <Option value="XL">9</Option>
                <Option value="XL">10</Option>
                <Option value="XL">11</Option>
                <Option value="XL">12</Option>
              </Select>
              </span>
              </div>
              <div className = 'col-md-4 ccv'>
                <span className = 'tag'>CCV</span> <br/>
                <Input className = 'number' type = 'number' className = 'w-100'/>
              </div> 
              </div>
              </div>
            </div>
            <button className = 'btn w-100 mt-3' onClick={saveOrderToDb} style = {{background: '#A17B14', color: 'white'}}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;