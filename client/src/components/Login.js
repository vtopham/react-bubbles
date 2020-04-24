import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Form = styled.form`
* {
  padding: 0
}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login-input {
    display: flex;
    width: 50%;
    margin: 2% 0;
    justify-content: space-between;



    button {
      width: 100%;
      height: 30px;
      border-radius: 5px;
    }
  }

`

const Login = () => {
  

  const history = useHistory()

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  //track changes using state
  const handleChange = event => {
    event.preventDefault();
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  //when the user hits the login button, do a post request to check credentials. If successful, store the token and navigate to the next page
  const handleSubmit = event => {
    event.preventDefault();
    axios.
      post("http://localhost:5000/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        history.push("/bubbles")
      })
      .catch(err => console.log(err))
    
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Form onSubmit = {handleSubmit}>
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
      </Form>
    </>
  );
};

export default Login;
