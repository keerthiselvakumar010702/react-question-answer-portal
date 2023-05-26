import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../Store/redux-store'
import { useSelector } from 'react-redux'
import {  Link } from "react-router-dom";
import Question from "./Question";
import './style.css';
const Login = () => {
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const dispatch =useDispatch();
    const a=useSelector(state=>state)
    console.log(a);
    const handleEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
        console.log(email);
      };
      const handlePasswordChange = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
        console.log(email);
      };
    const submit =async()=>{
        const reqdata = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: {
              "Content-type": "application/json;charset=UTF-8",
            },
          });
          const resdata = await reqdata.json();
        console.log(resdata);
        const accesstoken=resdata.data.token
        console.log(accesstoken);
      
        dispatch({
          type: "LOGIN",
          payload: { email, password, accesstoken },
        });
    }
  return (
    <div>
         <div>
      <div className="login">
       <h2>Login</h2>
        <label >Email:</label>
  <input type="email" id="email" name="email"  onChange={handleEmailChange} />
       
        
        <label >Password:</label>
  <input type="password" id="pwd" name="pwd" onChange={handlePasswordChange} />
   
        <div>
        <button className='login-submit-button' onClick={submit}><Link to="/question">Login</Link></button>
        </div>
      </div>
    </div>
     
 
    
    </div>
  )
}

export { Login}
