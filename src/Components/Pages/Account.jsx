import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header'
import { response } from '../../Helper/user-metadata.js'

export default function Account() {
  const [user, setUser] = useState(response.data.user);


  const formatCreatedDate = (createdDate) => {
    return new Date(createdDate).toLocaleDateString()
  }

  return (
    <>
      <Header />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "2rem"
          }}>
          <h1 className="title">My Page</h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            width: "1000px",
            justifyContent: "center",
            alignItems: "center"
          }}>


          <div
            style={{
              color: "#fff",
              padding: "2rem"
            }}>
            <h2>User Information</h2>
            <p><strong>Username: </strong>{ }</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Created account: </strong>{formatCreatedDate(user.created_at)}</p>
          </div>

          <div style={{}}>
            <h2>User Information</h2>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Created account: </strong>{formatCreatedDate(user.created_at)}</p>

          </div>

          <div style={{}}>
            <h2>User Information</h2>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Created account: </strong>{formatCreatedDate(user.created_at)}</p>

          </div>
        </div>

      </div>
    </>
  )
}
