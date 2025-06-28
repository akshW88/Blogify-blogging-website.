import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loginStatus,changeStatus]=useState('false');
  const [message,setMessage]=useState(null);
  const [userData,setUserData]=useState({
    name:'',
    email:'',
    password:'',
  });

  const handleChange=(e)=>{
    setUserData({
      ...userData,
    [e.target.name]:e.target.value,
  })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch("/api/user/login",{
          method:'POST',
          headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify(userData),
        })
        const data =await response.json();
        if(data.success){
            navigate('/');
        }
       changeStatus(data.success);
       
       setMessage(data.message);
      
    } catch (error) {

      setMessage("Internal server error. Please try again later.");
    }
  }

  return (
    <>
    { message && (
        <div className={`alert ${ 'alert-danger'}`} role="alert">
        {message}
      </div>
      )
    }


      <form onSubmit={handleSubmit}>
  
  <div className="mb-3 mt-4 ms-4">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={userData.email} onChange={handleChange} name='email'/>
  </div>
  <div className="mb-3 mt-4 ms-4">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={userData.password} onChange={handleChange} name='password'/>
  </div>
  <button type="submit" className="btn btn-primary ms-4">Submit</button>
</form>
</>
  )
}

export default Login