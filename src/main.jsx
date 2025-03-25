import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Account from './Components/account/Account.jsx'
import Error from './Components/error/Error.jsx'
import Wrapper from './Components/helper/Wrapper.jsx'
import Home from './Components/home/Home.jsx'
import Landing from './Components/home/Landing.jsx'
import Login from './Components/public/Login.jsx'
import Register from './Components/public/Register.jsx'
import ResetPassword from './Components/public/ResetPassword.jsx'
import Saved from './Components/saved//Saved.jsx'
import Snippet from './Components/snippet/Snippet.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/about" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/"
        element={<Home />}
      />

      <Route path='/view/:snippetid'
        element={<Snippet />}
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
