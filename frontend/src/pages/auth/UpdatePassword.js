import { Button, Input, message } from "antd";
import {Form} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const UpdatePassword = (props) => {
  const token = props.match.params.token;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const history = useHistory();
  useEffect(() => {
      if(!token) {
         history.push('/forgot/password');
      }
    return () => {
      
    }
  }, []);

  const submitHandler = async (e) => {
    await axios.post(`${process.env.REACT_APP_API}/user/update-password`, { password: password, confirm: confirm, token }).then((res) => {
      if (res.status === 200) {
        message.success({
          content: res.data.successMessage,
          style: {
            marginTop: "15vh",
          },
        });
         props.history.push('/login');
      } 
       else if(res.status === 201) {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: "15vh",
          },
        });
      }
      else {
        message.error({
          content: res.data.errorMessage,
          style: {
            marginTop: "15vh",
          },
        });
      }
    });
  };
  console.log(password)
  return (
    <div>
      <div className="form new-password">
        <div className="login-inner text-center" style={{ paddingTop: "20vh" }}>
          <h4>Enter New Password</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form>
                <div>
                <Input.Password placeholder = 'Enter new password' onChange = {(e) => setPassword(e.target.value)}/>
                </div>
                <div className = 'mt-2'>
                <Input.Password placeholder = 'Re-Enter new password' onChange = {(e) => setConfirm(e.target.value)}/>
                </div>
              <Button onClick = {submitHandler} type = 'submit' className = 'btn my-2 mt-2 w-50' style = {{height: '41px'}}>
                    Update 
                </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
