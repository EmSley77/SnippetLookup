import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Components/home/Home.jsx'
import Saved from './Components/saved//Saved.jsx'
import Login from './Components/public/Login.jsx'
import Account from './Components/Pages/Account.jsx'
import Snippet from './Components/Pages/Snippet.jsx'
import Error from './Components/Pages/Error.jsx'
import Register from './Components/public/Register.jsx'
import Wrapper from './Components/helper/Wrapper.jsx'
import ResetPassword from './Components/public/ResetPassword.jsx'
import './styles/main.css'

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

      <Route path='/account'
        element={
          <Wrapper>
            <Account />
          </Wrapper>}
      />

      <Route path='/saved'
        element={
          <Wrapper>
            <Saved />
          </Wrapper>}
      />
      <Route path='*'
        element={
          <Wrapper>
            <Error />
          </Wrapper>}
      />
    </Routes>
  </BrowserRouter>
)
