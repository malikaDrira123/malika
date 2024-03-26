import React, { useState } from 'react'
import "./CSS/loginsignup.css"

const LoginSignup = () => {


const [state , setState] = useState("Sign Up");

const [formData, setFormData] = useState( {
  username:"",
  password:"",
  email:""
})

const changeHandler = (e) => {
  setFormData({...formData, [e.target.name]:e.target.value})
}


const Login = async () =>{


let responseData;
  await fetch ('http://localhost:9000/api/users/signin', {
    method: 'POST',
    headers: {
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body: JSON.stringify(formData)
  })  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
    .then((data) => {

      responseData = data;


      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData))
      if(responseData.role==='admin'){
        window.location.replace("/admin")
        }else{
          window.location.replace("/")
        }
         
      
    });

}




const signup = async () =>{
  
  let responseData;
  await fetch ('http://localhost:9000/api/users/signup', {
    method: 'POST',
    headers: {
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then((response) => response.json())
    .then((data) => {

      responseData = data;


      setState("Login")
         
      
    });
}


  return (
    <section className='login-Signup'>
       <section className="login-container">
        <h1> {state}</h1>
          <section className="login-signup-fields">
            {state === "Sign Up" ?
            <input type="text" name="username" 
            value={formData.username} onChange={changeHandler} placeholder='Your Name' />  : <></>}

             <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Email' />
              <input type="password" name="password" value={formData.password} onChange={changeHandler}  placeholder='Password' />
          </section>

           <section className="login-Signup-agree">
              <input type="checkbox" name='' id=''/>
              <p>By continuing , i agree to the term of use & privacy policy</p>
           </section>
          <button onClick={() => state === "Login" ? Login() : signup() }> Continue</button>

          {state === "Sign Up" ? <p className="login-signup-login">
             Already have an account? <span onClick={() => {setState("Login")}}>Login here</span>
           </p> : <p className="login-signup-login">
             Create an account? <span onClick={() => {setState("Sign Up")}}>Click here</span>
           </p>
          } 
           
           
       </section>
    </section>
  )
}

export default LoginSignup
