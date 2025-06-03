import React from 'react'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn/>}/>
          <Route path='/todo' element={<Home />} />
          <Route path='/signup' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App