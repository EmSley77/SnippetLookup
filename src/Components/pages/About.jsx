import React from 'react';
import { Link } from 'react-router';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const exampleCode = `import React from 'react';

const ExampleComponent = () => {
  return (
    <div className="p-4">
      <h1>Hello, World!</h1>
      <p>This is a simple React component.</p>
    </div>
  );
};

export default ExampleComponent;`;

export default function Landing() {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold">Welcome to CodeBlock</h1>
                    <p className="mt-4 text-lg">Showcase your code snippets beautifully and effortlessly.</p>
                    <Link to="/" className="mt-6 inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">Explore Now</Link>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold text-indigo-700">Display Your Code with Style</h2>
                        <p className="mt-4 text-gray-600">CodeBlock helps you format and share your code with ease. Whether you're a developer showcasing snippets or a teacher explaining concepts, CodeBlock makes your work stand out.</p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                        <SyntaxHighlighter language='javascript' style={vscDarkPlus}>
                            {exampleCode}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="py-16">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <img src="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png" className="rounded-lg shadow-lg" alt="Code snippet example" />
                    <div>
                        <h2 className="text-3xl font-semibold text-indigo-700">Join the Developer Community</h2>
                        <p className="mt-4 text-gray-600">Share your work, receive feedback, and collaborate with other developers to improve your skills. Being part of a community accelerates your growth and enhances your coding journey.</p>
                    </div>
                </div>
            </section>

            {/* Save & Collaborate Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold text-indigo-700">Save Your Work, Improve Over Time</h2>
                        <p className="mt-4 text-gray-600">Store your snippets, add comments, and revisit them anytime. Keep your code organized and improve iteratively.</p>
                    </div>
                    <img src="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png" className="rounded-lg shadow-lg" alt="Save and Go Back" />
                </div>
            </section>

            <Footer />
        </>
    );
}