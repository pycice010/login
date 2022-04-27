import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from "../components/navbar";

const URL = "http://localhost/api/products";
const URL2 = "http://localhost/api/purchase";

const fetcher = url => axios.get(url).then(res => res.data)

const SWR2 = () => {
    const [products, setproducts] = useState({ list: [{ id: 1, name: 'cat', position: 'controller', skill: 'smoke' },] })
    const [product, setproduct] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [imageurl,setImageurl] = useState('')
    const [skill, setSkill] = useState('')


    useEffect(() => { getproducts() }, [])

    const getproducts = async () => {
        let products = await axios.get(URL)
        setproducts(products.data)

    }
    const buyproduct = async (id) => {
        const result = await axios.delete(`${URL2}/${id}`)
        console.log(result.data)
        getproducts()
    }


    const printproduct = () => {
        if (products && products.length)
            return products.map((product, index) =>
            
                <li key={index} class=" rounded-lg border-dashed outline outline-offset-1 outline-[#DBCDE3] justify-between">
                    <h6 class="text-2xl text-[#2A505A] pb-1 pt-1 not-italic font-bold font-extrabold">{(product) ? product.name : '-'}</h6>
                    <img src={product.imageurl} width="2000" height="4000" class="items-center justify-around"></img>
                    <h6 class="font-extrabold text-[#695A5B]">position:{(product) ? product.position : 0}</h6>
                    <h6 class="font-extrabold text-[#695A5B]">skill:{(product) ? product.skill : 0}</h6>
                   
                </li>
                
            )
        else
            return <h1 class="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFBBDA] to-[#75464A] pb-8 pt-8 font-bold font-extrabold "> No Information</h1>
    }
    return (<div class="bg-red-100 sm:h-screen items-center " >
        <Navbar />
        <div class="flex flex-col justify-around  items-center">
        <h1 class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFBBDA] to-[#75464A] pb-8 pt-8 font-bold font-extrabold">AGENT VALORANT</h1>
        <ul class=" grid grid-cols-6 gap-10  " >{printproduct()}</ul>
        </div>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
