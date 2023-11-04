import React, { useEffect, useState } from 'react'
import Card from '../component/Card'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
// import { set } from 'mongoose'

export default function Home() {
    const [search, setSearch] = useState('')
    const [foodcat, setfoodcat] = useState([])
    const [fooditem, setfooditem] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        setfooditem(response[0]);
        setfoodcat(response[1]);



    }

    useEffect(() => {
        loadData()
    }, [])
    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ "zIndex": "10" }}>
                            <div className="d-flex justify-content-centre">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodcat.size !== 0
                        ? foodcat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        fooditem.size !== 0 ? fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 '>
                                                        <Card foodData={filterItems} options={filterItems.options[0]}
                                                        />
                                                    </div>
                                                )
                                            }) : ""
                                    }
                                </div>
                            )
                        }) : ""
                }
            </div>

            <div><Footer /></div>

        </div>
    )
}
