import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser, login } from "../../functions/auth";
import { GoogleLogin } from 'react-google-login';
import { setAuthentication } from "../../functions/setLoginInfo";
import { Children } from "react";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
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

  const responseGoogle = response => {
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      login(email, password)
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
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
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

  const loginForm = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" onChange = {(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>
        </div>
        <div className="form-group row mt-5">
          <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" onChange = {(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
        </div>
        <br />
        <div className = 'text-center'>
        <Button
        onClick={handleSubmit}
        className="mb-3 w-50 text-white"
        style = {{background: '#9f780f'}}
        block
        shape="round"
        // icon={<MailOutlined />}
        size="large"
        // disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
      </div>
      </form>
    </div>
  );

  return (

    <div className="container p-5 login">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className='text-center'>Sign in</h4>
          )}
          {loginForm()}

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

export default Login;