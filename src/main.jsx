import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { app } from '../dbconfig.js'

createRoot(document.getElementById('root')).render(
    <App />
)
