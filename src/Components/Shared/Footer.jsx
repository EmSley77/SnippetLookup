import React from 'react';
import { Link } from 'react-router';
import '../../styles/style.css';

export default function Footer() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
            <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
                <div className="w-full text-7xl font-bold">
                    <h1 className="w-full md:w-2/3">How can we help?</h1>
                </div>
                <div className="flex mt-8 flex-col md:flex-row md:justify-between">
                    <p className="w-full md:w-2/3 text-gray-400">
                        "Our goal is to make building and sharing easier for developers. This website is designed to provide a seamless experience where code snippets and resources are easily accessible, shareable, and ready to be integrated into your projects. We encourage collaboration and verification of content to ensure that what you're working with is both accurate and useful. If you find any content that lacks proper references or verification, feel free to question it – together, we can ensure that this platform remains a reliable tool for developers." <br />
                        - Emanuel

                    </p>

                    <div className="w-44 pt-6 md:pt-0">
                        <Link to={"/contact"} className="bg-red-500 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center">
                            Contact
                        </Link>
                    </div>
                </div>
                <div className="flex mt-24 mb-12 flex-row justify-between">
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">About</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Services</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Why us</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Contact</Link>
                </div>

            </div>
        </div>

    );
}