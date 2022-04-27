import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => (
    <nav class="bg-orange-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-500">
        <div class="container flex flex-wrap justify-between items-center mx-auto ">
            <a href="/" class="flex items-center">
                <Image src="/logo.png" width={40} height={40} />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-serif"></span>
            </a>

            <div class="hidden w-full md:block md:w-auto" id="mobile-menu ">
                <ul class="flex flex-col mt-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium font-serif">
                    <li>
                        <Link href="/products" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Our product</Link>
                    </li>
                    <li>
                        <Link href="/admin" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</Link>
                    </li>
                    <li>
                        <Link href="/register" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
                    </li>
                    <li>
                        <Link href="/login" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                    </li>
                    <li>
                        <Link href="/logout" class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</Link>
                    </li>
                    <li>
                        <Link href="https://www.facebook.com/sadsada.hanlun/" class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

)

export default Navbar
