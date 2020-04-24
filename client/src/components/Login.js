import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleChange = event => {
    event.preventDefault();
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.
      post("http://localhost:5000/api/login", credentials)
      .then(res => localStorage.setItem("token", res.data.payload))
      .catch(err => console.log(err))
    
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit = {handleSubmit}>
        <div className = "login-input">
          <label htmlFor = "username" id = "username">Username: </label>
          <input onChange = {handleChange} type = "text" name = "username" value = {credentials.username}/>
        </div>
        <div className = "login-input">
          <label htmlFor = "password" id = "password">Password: </label>
          <input onChange = {handleChange} type = "password" name = "password" value = {credentials.password}/>
        </div>
        <div className = "login-input">
          <button>Log In</button>
        </div>
      </form>
    </>
  );
};

export default Login;
