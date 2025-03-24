import React from 'react'
import '../../styles/style.css'
import { Link } from 'react-router'
export default function Landing() {
    return (
        <section className="bg-gray-900 lg:grid lg:h-screen lg:place-content-center">
            <div
                className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
            ><div className="max-w-lg text-left">
                    <h1 className="text-4xl font-bold text-gray-100 sm:text-5xl leading-tight">
                        Welcome to CodeBank!
                        <br />
                        A site for developers, made by <strong className="text-indigo-600">developers</strong>.
                    </h1>

                    <p className="mt-4 text-base text-gray-200 sm:text-lg">
                        Discover, share, and save code snippets with ease. Join a community of developers where you can
                        browse, copy, and contribute to a growing collection of code across multiple languages and frameworks.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <Link
                            className="inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-all hover:bg-indigo-700"
                            to={"/login"}
                        >
                            Get Started
                        </Link>

                        <a
                            className="inline-block rounded-lg border border-gray-600 px-5 py-3 font-medium text-gray-300 shadow-sm transition-all hover:bg-gray-800 hover:text-white"
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>



            </div>
        </section>
    )
}
