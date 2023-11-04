import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import {useSelector} from "react-redux";
import Modal from '../Modal'
import Cart from '../screens/cart';

export default function Navbar() {
    const navigate=useNavigate()
    const [cartShow,setCartShow]=useState(false);
    const cart=useSelector((state)=>{
        return state.reducer.cart;
    });
    const handleLogout=()=>{
        {localStorage.removeItem("authToken")}
        navigate('/login')
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <div class="container-fluid">
                    <Link class="navbar-brand fs-1 fst-italic" to="#">G0F00D</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <Link class="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem('authToken'))?<li class="nav-item">
                                <Link class="nav-link active fs-5 " aria-current="page" to="#">My Orders</Link>
                            </li>:""}
                        </ul>
                        {
                            (!localStorage.getItem('authToken'))?
                            <div className='d-flex'>
                                <Link class="btn bg-white text-success mx-1" name="login" to="/login">Login</Link>
                                <Link class="btn bg-white text-success mx-1" name="signup" to="/createuser">Signup</Link>
                            </div>
                            :
                            <div >
                                <div className='btn bg-white text-success mx-2' onClick={()=>setCartShow(true)}>
                                    My Cart
                                    <Badge pill bg="danger">{cart.length}</Badge>
                                
                                </div>
                                    {
                                        (cartShow?<Modal onClose={()=>setCartShow(false)}><Cart/></Modal>:null)
                                    }
                                <div className='btn btn-danger text-white mx-2' onClick={handleLogout}>LogOut</div>                            
                            </div>

                        }
                            
                    </div>
                </div>
            </nav>
        </div>
    )
}
