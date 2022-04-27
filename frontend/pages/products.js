import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from "../components/navbar";

const URL = "http://localhost/api/products";
const URL2 = "http://localhost/api/purchase";

const fetcher = url => axios.get(url).then(res => res.data)

const SWR2 = () => {
    const [products, setproducts] = useState({ list: [{ id: 1, name: 'cat', number: 1, price: 2000 },] })
    const [product, setproduct] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [imageurl,setImageurl] = useState('')
    const [price, setPrice] = useState(0)


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
            
                <li key={index} class=" rounded-lg outline outline-offset-1 outline-blue-200 ">
                    <h6 class="text-2xl text-red-500 pb-1 pt-1 not-italic font-bold font-serif">{(product) ? product.name : '-'}</h6>
                    <img src={product.imageurl} width="200" height="100" class="items-center justify-around"></img>
                    <div class="border-4 border-blue-200 rounded-lg bg-red-100 divide-y-4 divide-blue-300">
                    <h6 class="font-bold font-serif">Number:{(product) ? product.number : 0}</h6>
                    <h6 class="font-bold font-serif">price:{(product) ? product.price : 0}</h6>

                    </div>
                   
                </li>
                
            )
        else
            return <h1 class="font-bold font-serif text-2xl text-teal-900 items-center "> No product</h1>
    }
    return (<div class="bg-red-100 sm:h-screen items-center " >
        <Navbar />
        <div class="flex flex-col justify-around  items-center">
        <h1 class="text-4xl text-teal-900 pb-8 pt-8 font-bold font-serif">Products Show</h1>
        <ul class=" grid grid-cols-6 gap-10  " >{printproduct()}</ul>
        </div>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}