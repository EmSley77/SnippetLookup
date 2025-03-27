import React from 'react';
import { Link } from 'react-router';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../../styles/style.css';
export default function Footer() {
    return (
        <div className="w-full flex items-center justify-center bg-gray-950 p-12">
            <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
                <div className="w-full text-3xl md:text-5xl font-bold">
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
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase" to={"/about"}>About</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase" to={"/"}>Browse</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Services</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Why us</Link>
                    <Link className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Contact</Link>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center gap-6 mt-8">
                    <a
                        href="https://github.com/EmSley77"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-white text-2xl"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/emanuel-sleyman-660552293/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-white text-2xl"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </div>
    );
}