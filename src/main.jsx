import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './Components/Pages/App.jsx'
import Account from './Components/Pages/Account.jsx'
import './Styles/main.css'
import Snippet from './Components/Pages/Snippet.jsx'
import Error from './Components/Pages/Error.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/view/:snippetid' element={<Snippet />} />
      <Route path='/account/:id' element={<Account />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </BrowserRouter>,
)
