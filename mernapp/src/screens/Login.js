import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Login() {
  let navigate=useNavigate() 
  const[credential,setCredential]=useState({email:"",password:""})
  const handlesubmit= async (e)=>{
      e.preventDefault();
      const response=await fetch('http://localhost:5000/api/login',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({email:credential.email,password:credential.password})
      })
      const json=await response.json();
    //   console.log(json);
      if(!json.success){
        alert("invalid password or email ")
        return response.json({"msg":"invalid"})
    }
    if(json.success) {
        localStorage.setItem("userEmail",credential.email);
        localStorage.setItem("authToken",json.authToken);
        navigate('/');
        return response.json({"msg":"Success"})
    }
}

const onchange=(e)=>{
    const{name,value}=e.target;
    // console.log(e.target);
    setCredential({...credential,[name]:value});
}
  return (
    <>
            <div className="container">

            <form onSubmit={handlesubmit}>
                <div className="mb-3 email-login">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onchange}/>
                </div>
                <div className="mb-3 password-login">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary login-btn">Submit</button>
                <Link to='/createuser' className='m-3 btn btn-danger'>New User??</Link>
            </form>
            </div>
        </>
  )
}
