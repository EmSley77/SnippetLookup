import React from 'react'

//TODO_ add images, comment page and more
export default function SaveSection() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
                    <div className="md:col-span-3">
                        {/* Add your image here */}
                        <img
                            src="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png"
                            className="rounded"
                            alt="Save and Go Back"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <div className="max-w-lg md:max-w-none">
                            <h2 className="text-2xl font-semibold text-teal-300 sm:text-3xl">
                                Save Your Work, Add Comments, and Go Back to Continue
                            </h2>

                            <p className="mt-4 text-yellow-300">
                                Saving your work ensures that your progress is not lost. With just a click, you can preserve your code snippets and come back to them later for further edits or review. Take a moment to add useful comments so others can understand your work or provide feedback. This way, you can keep improving with every iteration.
                            </p>
                            <p className="mt-4 text-indigo-300">
                                Going back to your saved snippets gives you the freedom to pick up right where you left off. Add comments to your code for better collaboration, review, or personal notes. Keep your projects organized, and share them with others to get helpful insights and grow together as a community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

