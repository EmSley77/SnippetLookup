import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App.jsx'
import { BrowserRouter, Routes } from 'react-router'
import './Styles/main.css'
import { Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path='/fullscreen/:snippetid' element={<App />} />
    </Routes>
  </BrowserRouter>,
)
