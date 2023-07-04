import React, { useEffect, useState } from 'react'
import Card from '../component/Card'
import Carousel from '../component/Carousel'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
// import { set } from 'mongoose'

export default function Home() {
    const [search,setSearch]=useState('')
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
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div class="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{"zIndex":"10"}}>
                        <div className="d-flex justify-content-centre">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                                {/* <button class="btn btn-outline-success text-white" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div class="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" class="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" class="d-block w-100" alt="..." style={{filter:"brightness(30%)"}} />
                    </div>
                    <div class="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" class="d-block w-100" alt="..." style={{filter:"brightness(30%)"}} />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container'>
                {
                    foodcat !== []
                        ? foodcat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        fooditem !== [] ? fooditem.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map((filterItems) => {
                                                    {/* console.log(filterItems) */}
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 '>
                                                    <Card foodname={filterItems.name} imgSrc={filterItems.img} 
                                                        option={filterItems.options[0]}
                                                        desc={filterItems.description}
                                                    />
                                                    </div>
                                                )
                                            }): ""
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
