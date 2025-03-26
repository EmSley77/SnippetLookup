import React from 'react'
import '../../styles/style.css'

export default function Hero() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
                    <div className="md:col-span-3">
                        <img
                            src="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png"
                            className="rounded"
                            alt="Code snippet example"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <div className="max-w-lg md:max-w-none">
                            <h2 className="text-2xl font-semibold text-teal-300 sm:text-3xl">
                                Share Your Code, Get Feedback, and Improve Together
                            </h2>

                            <p className="mt-4 text-yellow-300">
                                By sharing your code with others, you open the door to valuable feedback that can help you grow as a developer. Code sharing isn't just about sharing your work; it's about engaging with a community of like-minded developers who can offer suggestions, improvements, and insights that can make you a better coder. Join a supportive community, learn from others, and elevate your skills.
                            </p>
                            <p className="mt-4 text-indigo-300">
                                Collaborating with others not only enhances your projects but helps you become part of a network where developers uplift each other. Whether you’re just starting or have years of experience, contributing and learning from the community can accelerate your growth. So, why not share your code and become part of a community of passionate coders?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
