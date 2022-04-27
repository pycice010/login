import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Image from 'next/image'


export default function Home({ token }) {

  return (

    <div class="bg-red-100 sm:h-screen ">

      <Navbar />
      <div class="flex flex-col justify-around  items-center space-y-6 pb-14">
        <h1 class="pt-6 text-3xl text-pink-600 flex flex-col justify-around  items-center font-serif">NBA Shirt FOR U</h1>

        <h1 class="text-2xl text-pink-500 font-serif">Wellcome To NBA Shirt Shop</h1>
        <h1 class="text-2xl text-pink-500 font-serif">This Web site for your who looking for a shirt from NBA star them choose what products that you want!</h1>
        <Image width="400" height="540" src="/memes.jpeg" />
      </div>

      <footer class=" flex justify-center mt-4 bg-gradient-to-r from-purple-700 to-pink-700 p-5  ">
        <p class="text-indigo-100 text-2xl font-serif">
          Create by Sadsada Handloon 6035512091
        </p>
      </footer>


    </div>

  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}