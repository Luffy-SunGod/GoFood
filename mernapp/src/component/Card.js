import React from 'react'

export default function Card(props) {
    let options=props.option
    let priceoption=Object.keys(options||{})
        return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodname}</h5>
                        <div className="container w-100">
                            <select className='m-2 h-100  bg-success'>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (<option key={i + 1} value={i + 1}>{i + 1}</option>)
                                    })
                                }
                            </select>

                            <select className='m-2 h-100  bg-success rounded'>
                                {
                                    priceoption.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                    })
                                }

                            </select>

                            <div className=' h-100 fs-5'>
                                Total price
                            </div>
                            <hr />
                            <button className='btn btn-success justify-centre ms-2'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 