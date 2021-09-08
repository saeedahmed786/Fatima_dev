import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { GoogleLogin } from 'react-google-login';
import { createOrUpdateUser, login, register } from "../../functions/auth";
import { setAuthentication } from "../../functions/setLoginInfo";

const Register = ({ history }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    
});

const { firstName, lastName, email, password, confirm } = userData;

const handleChange = (e) => {
  setUserData({
      ...userData,
    [e.target.name] : e.target.value
    });
  }

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);


  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended 
    let intended = history.location.state;
    if (intended) {
      history.push(intended.form);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }

    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirm) {
       toast.error(`Passwords don't match`);
    } else {
      register(firstName, lastName, email, password)
      .then((res) => {
        if(res.status == 200) {
           toast.success(res.data.successMessage);
           setTimeout(() => {
               history.push('/login');
           }, 2000);
        }
        else if(res.status == 201) {
           toast.warning(res.data.errorMessage);
           setTimeout(() => {
               history.push('/login');
           }, 2000);
        }
      })
      .catch((err) => console.log(err));
    }
  }


  const responseGoogle = response => {
    console.log(response);
  };

  const googleLogin = async (response) => {
    createOrUpdateUser(response.tokenId)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.user.name,
            email: res.data.user.email,
            token: res.data.token,
            role: res.data.user.role,
            _id: res.data.user._id,
          },
        });
        setAuthentication(res.data.user, res.data.token);
        roleBasedRedirect(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
};
  
  return (
    <div className="container p-5 register">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Welcome</h4>
          <h5>Create an Account</h5>
          <hr />
          <form className="needs-validation" novalidate onSubmit = {handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="validationCustom01">First name: <span className='sta mt-5r'>*</span></label>
                <input type="text" className="form-control" name = 'firstName' id="validationCustom01" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom02">Last name: <span>*</span></label>
                <input type="text" className="form-control" name = 'lastName' id="validationCustom02" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label for="validationCustom03">Email: <span>*</span></label>
                <input type="text" className="form-control" id="validationCustom03" name = 'email' onChange = {handleChange} required />
                <div className="invalid-feedback">
                  Please provide a valid city.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom01">Password: <span>*</span></label>
                <input type="password" className="form-control" name = 'password' id="validationCustom01" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom02">Confirm: <span>*</span></label>
                <input type="password" className="form-control" name = 'confirm' id="validationCustom02" onChange = {handleChange} required />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className="col-md-6 mb-3">
                <button className="btn p-3" type="submit">Create Account</button>
              </div>
              <div className="col-md-6 mb-3">
              <div className="form-group">
                <div className="form-check">
                  {/* <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required /> */}
                  <Checkbox/>
                    <span style = {{marginLeft: '10px'}}>Subscribe to our newsletter</span>
                </div>
              </div>
              </div>
              </div>
          </form>
          <div className='or-border'>
            <h2><span>or</span></h2>
          </div>

          <div className = 'google-button text-center'>
          <GoogleLogin
            clientId= "971744690757-7bofg1rqslqvst1glaspi5o9li7le07k.apps.googleusercontent.com"
            buttonText="Sign In With Google"
            onSuccess={googleLogin}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;