
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState(false)

  const changeHandler = (e) => {
    const { name, value } = e.target

    setLoginForm({
      ...loginForm,
      [name]: value,
    })
  }

  const submitHandler = async (el) => {
    el.preventDefault()

    try {
      // console.log(loginForm, "<-------------data")
      const {data} = await axios.post("http://localhost:3000/login", {
        email: loginForm.email,
        password: loginForm.password,
      })
      // console.log(data, "<-------------data")
      localStorage.access_token = data.access_token
      localStorage.id = data.id
      localStorage.gender = data.gender

      navigate(`/user/${localStorage.id}`)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    if(localStorage.access_token) {
      navigate("/home")
    }
  }, [])
  

  

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <form className="p-4 bg-light border rounded" onSubmit={submitHandler}>
              <div className="form-group">
                <label  className="form-label">Email address</label>
                <input type="email" 
                  value={loginForm.email}
                  onChange={changeHandler}
                  name='email'
                  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div className="form-group">
                <label  className="form-label">Password</label>
                <input type="password" 
                  value={loginForm.password}
                  onChange={changeHandler}
                  name='password'
                  className="form-control" id="exampleInputPassword1"/>
              </div>

              
              <div style={{marginTop: "10px"}}>
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
        </form>
      </div>
      </>
  );
};

export default Login;
