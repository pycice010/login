import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config/config'
import {useRouter} from "next/router";
import Swal from 'sweetalert2'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')
    const router = useRouter();

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        //setStatus("Logout successful")
        await router.push('/login')
    }

    return (
        <Layout class="bg-[#E5D0E2]">
            <Head>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
            </Head>
                                <div class=" h-screen justify-center bg-gradient-to-r from-[#FFBBDA] to-[#75464A] p-9 grid grid-row-3 gap-3 pt-10 ">
                                    <h1 class="pt-6 text-6xl text- flex flex-col justify-around text-[#D4D2F2] items-center font-extrabold">Logout</h1>
  
                                </div>

        </Layout>
    )
}