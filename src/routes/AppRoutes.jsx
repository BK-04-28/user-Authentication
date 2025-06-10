import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import SearchBar from '../components/SearchBar';
import ResetPassword from '../components/ResetPasswordForm';
import CreateUser from '../components/CreateUser';
import EditUser from '../components/EditUser';

const AppRoutes = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<CreateUser/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reset" element={<ResetPassword/>} />   
        <Route path="/search" element={<SearchBar/>} />
        <Route path="/edit-user" element={<EditUser />} />   
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
