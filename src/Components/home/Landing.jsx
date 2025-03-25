import React from 'react'
import Footer from '../Shared/Footer.jsx'
import '../../styles/style.css'
import { Link } from 'react-router'
export default function Landing() {
    return (
        <>
            <section className="bg-gray-900 text-white py-20 h-screen">
                <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
                    <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                        <h1 className="text-5xl md:text-5xl  text-yellow-300 tracking-loose">CodeBlock</h1>
                        <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
                            Display Your Code with Style
                        </h2>
                        <p className="text-sm md:text-base text-gray-50 mb-4">
                            CodeBlock is a stylish tool for developers to display code snippets, making it easier to share and understand programming concepts. You can use CodeBlock to showcase specific code samples, explain logic, or even highlight potential issues with the code.
                        </p>
                        <div className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                            <Link to={"/login"} className="text-sm">Explore now!</Link>
                        </div>
                    </div>
                    <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
                        <div className="h-48 flex flex-wrap content-center">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                                <pre className="text-sm">
                                    <code className="text-yellow-300">
                                        {`import React from 'react';

const ExampleComponent = () => {
  return (
    <div className="p-4">
      <h1>Hello, World!</h1>
      <p>This is a simple React component.</p>
    </div>
  );
};

export default ExampleComponent;`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
