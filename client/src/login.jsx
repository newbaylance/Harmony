
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()

  async function handleCredentialResponse(response) {
    try {
        const { data } = await axios({
            url: "http://localhost:3000/google-sign-in",
            method: "post",
            headers: {
                google_token: response.credential,
            }
        })

        localStorage.access_token = data.access_token
        localStorage.id = data.id

        navigate(`/user/${localStorage.id}`)
    } catch (error) {
        console.log(error)
    }
  }

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

    google.accounts.id.initialize({
        client_id:
            "726630264573-de4e2rdek6ljsaeekaggd9vb24gc6m0t.apps.googleusercontent.com",
        callback: handleCredentialResponse
    })

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {theme: "outline", size: "large"}
    )
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
              </div> <br />
              <div>
                 <p>Don't have an account yet?</p> <a href="/register">Register</a>
              </div> <br />
              <div id="buttonDiv"></div>
        </form>
      </div>
      </>
  );
};

export default Login;
