import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Components/Pages/Home.jsx'
import Login from './Components/Pages/public/Login.jsx'
import Account from './Components/Pages/Account.jsx'
import Snippet from './Components/Pages/Snippet.jsx'
import Error from './Components/Pages/Error.jsx'
import Register from './Components/Pages/public/Register.jsx'
import Wrapper from './Components/Pages/helper/Wrapper.jsx'
import ResetPassword from './Components/Pages/public/ResetPassword.jsx'
import './Styles/main.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/home"
        element={
          <Wrapper>
            <Home />
          </Wrapper>}
      />

      <Route path='/view/:snippetid'
        element={
          <Wrapper>
            <Snippet />
          </Wrapper>}
      />

      <Route path='/account/:id'
        element={
          <Wrapper>
            <Account />
          </Wrapper>}
      />
      <Route path='*'
        element={
          <Wrapper>
            <Error />
          </Wrapper>}
      />
    </Routes>
  </BrowserRouter>,
)
