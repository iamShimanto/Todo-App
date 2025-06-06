import React from 'react'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Error from './pages/Error.jsx'
import Profile from './pages/Profile.jsx'
import Reset from './pages/Reset.jsx'
import Admin from './pages/admin/Admin.jsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn/>}/>
          <Route path='/todo' element={<Home />} />
          <Route path='/signup' element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset" element={<Reset/>}/>
          <Route path='*' element={<Error />} />
          <Route path='/admintodo' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App