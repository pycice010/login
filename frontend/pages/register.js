import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'
import {useRouter} from "next/router";
import Swal from 'sweetalert2'


export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const router = useRouter();



    const register = async () => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            /*console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)*/
            Swal.fire(
                'Register-Success',
                'Please Login!',
                'success'
              )
        }
        catch (e) {
            console.log(e)
        }
        await router.push('/login')
    }

    const registerForm = () => (
        <div>

            <div class="font-serif">
                Username:
            </div>
            <div class="font-serif">
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div class="font-serif">
                Email:&nbsp;&nbsp;
            </div>
            <div class="font-serif">
                <input type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="font-serif">
                Password:&nbsp;&nbsp;
            </div>
            <div class="font-serif">
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title >Register</title>


                <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
            </Head>
            <div class="bg-red-100 sm:h-screen ">
               <Navbar />
                <div class="py-20">
                    <div class="py-20">
                        <div class="py-20">
                            <div class="py-18">
                                <div class=" justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-9 grid grid-row-3 gap-3 pt-10 ">
                                    <h1 class="pt-6 text-3xl text-blue-600 flex flex-col justify-around  items-center font-bold font-serif">Register</h1>
                                    {registerForm()}
                                    <div>
                                        <button onClick={register} class="shadow-md mr-4 bg-red-500 p-2 rounded-lg hover:bg-red-200 hover:text-red-500 font-serif">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export function getServerSideProps({ req }) {
    return { props: { token: req.cookies.token || "" } };
}