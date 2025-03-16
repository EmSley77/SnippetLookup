import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './Components/Pages/App.jsx'
import './Styles/main.css'
import Snippet from './Components/Pages/Snippet.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path='/view/:snippetid' element={<Snippet />} />
    </Routes>
  </BrowserRouter>,
)
