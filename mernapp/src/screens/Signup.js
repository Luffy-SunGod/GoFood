import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const[credential,setCredential]=useState({name:"",email:"",password:""})
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
        })
        const json=await response.json();
        console.log(json);
        console.log(json.success);
        if(!json.success)alert("invalid credentials ")
        else alert("sucess");
    }

    const onchange=(e)=>{
        const{name,value}=e.target;
        console.log(e);
        setCredential({...credential,[name]:value});
    }
    return (
        <>
            <div className="container">

            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">username</label>
                    <input type="text" className="form-control" id="name" name='name' value={credential.name} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onchange}/>
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
            </form>
            </div>
        </>
    )
}
