import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Error from './Components/error/Error.jsx'
import Wrapper from './Components/helper/Wrapper.jsx'
import Account from './Components/pages//Account.jsx'
import About from './Components/pages/About.jsx'
import CreateSnippet from './Components/pages/CreatePost.jsx'
import Home from './Components/pages/Home.jsx'
import Login from './Components/pages/Login.jsx'
import Post from './Components/pages/Post.jsx'
import Register from './Components/pages/Register.jsx'
import Saved from './Components/pages/Saved.jsx'
import ResetPassword from './Components/password/ResetPassword.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/"
        element={<Home />}
      />

      <Route path='/view/:postId'
        element={<Post />}
      />

      <Route path='/account'
        element={
          <Wrapper>
            <Account />
          </Wrapper>}
      />

      <Route path='/create'
        element={
          <Wrapper>
            <CreateSnippet />
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
