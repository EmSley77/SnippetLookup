import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App.jsx'
import './Styles/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
