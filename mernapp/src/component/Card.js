import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart,updateCart } from '../feature/cart/cartSlice'

export default function Card(props) {
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.reducer.cart);
    const {name,img}=props.foodData
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const priceRef=useRef("");
    let options=props.options;
    let priceoption=Object.keys(options)
    let finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])

    function handleAddToCart(props,qty,size){
        
        let food;
        console.log("entry hogyi ha",qty)
        for(let fd of cart){
            console.log(typeof fd)
            if(props.foodData._id===fd._id){
                food=fd;
            }
            break;
        }
        if(food!==undefined){
            // qty+=food.qty;
            if(size===food.size){
                console.log("update hona chiye");
                dispatch(updateCart({...props.foodData,qty,size,finalPrice}))
            }
            else{
                dispatch(addToCart({...props.foodData,qty,size,finalPrice}));
            }
        }else dispatch(addToCart({...props.foodData,qty,size,finalPrice}))
    }
        return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <div className="container w-100">
                            <select className='m-2 h-100  bg-success' onChange={(e)=>setQty(e.target.value)}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (<option key={i + 1} value={i + 1} >{i + 1}</option>)
                                    })
                                }
                            </select>

                            <select className='m-2 h-100  bg-success rounded'  ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {
                                    priceoption.map((data)=>{
                                    return <option key={data} value={data} >{data}</option>
                                    })
                                }

                            </select>

                            <div className=' h-100 fs-5'>
                                Rs.{finalPrice}
                            </div>
                            <hr />
                            <button className='btn btn-success justify-centre ms-2' onClick={()=>handleAddToCart(props,qty,size)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 