import React from 'react'

export default function UserInfo({user, formatCreatedDate}) {
    return (
        <>
            <div className="flex flex-col gap-2 lg:grid-cols-2 p-4 bg-gray-900 shadow-2xl rounded-xl w-full h-[800px]">

                {/* User Info Section */}
                <div className="flex flex-col justify-between p-4 text-gray-300 bg-gray-700 rounded-xl shadow-md ">
                    <div className="space-y-3">
                        <hr className="border-gray-300" />
                        <h3 className="text-lg font-bold ">@{user.user_metadata.display_username}</h3>
                        <p className="text-m">
                            {user.user_metadata.name} {user.user_metadata.lastname}
                        </p>
                        <p className="text-m">
                            <strong>Preferred language:</strong> {user.user_metadata.preferred_language}
                        </p>
                        <p className="text-m ">
                            <strong>Created account:</strong> {formatCreatedDate(user.created_at)}
                        </p>
                        <hr className="border-gray-300" />
                    </div>
                </div>

                {/* User's Snippets Section */}
                <div className="flex flex-col bg-gray-900 p-4 rounded-xl shadow-md h-full text-white">
                    <h1 className="text-lg font-medium ">User Snippets</h1>
                    <p className="text-s ">Retrieve and display user-uploaded snippets here.</p>
                    <hr />
                </div>
                <div>
                    {/* list of snippets goes here */}
                </div>
            </div>
        </>
    )
}
