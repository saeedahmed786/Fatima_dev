import { Button, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'

export const SendResetPasswordLink = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
             await axios.post(`${process.env.REACT_APP_API}/user/send-reset-password-email`, {email}).then(res => {
                 if(res.status === 200) {
                    message.success({
                        content : res.data.successMessage,
                        style: {
                            marginTop: '15vh',
                          },
                    });
                    setLoading(false);
                 }
                  else {
                    message.error({
                        content : res.data.errorMessage,
                        style: {
                            marginTop: '15vh',
                          },
                    });
                  }
             })
        
    }
    return (
        <div className = 'form' style = {{height: '100vh'}}>
        <div className = 'form-inner text-center' style = {{paddingTop: '15vh'}}>
            {
                loading &&
                <h4 className = 'fw-bolder'>Loading...</h4>
            }
        <h4>Enter Your Email to Reset Password</h4>
        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className = 'w-100'>
         <form className = 'w-50'>
              <div className="floating-label-group my-2">
                 <input placeholder = 'Enter your email' onChange = {handleChange} name = 'email' type="text" id="email" className="form-control" autofocus required />
                </div>
          <Button onClick = {submitHandler} className = 'btn my-2 mt-2 w-50' style = {{height: '41px'}}>
             Send E-mail
          </Button>
      </form>
      </div>
      </div>
    </div>
    )
}
