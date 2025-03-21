import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Components/Pages/Home.jsx'
import Login from './Components/Pages/Login.jsx'
import Account from './Components/Pages/Account.jsx'
import './Styles/main.css'
import Snippet from './Components/Pages/Snippet.jsx'
import Error from './Components/Pages/Error.jsx'
import Register from './Components/Pages/Register.jsx'
import Wrapper from './Components/Pages/Wrapper.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
