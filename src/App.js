import React from "react";

import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from "./components/common/header";
import HomePage from "./pages/home";
import ServiceSystemPage from "./pages/serviceSystems";
//import { useSelector, useDispatch } from 'react-redux'
//import { decrement, increment } from './feature/counter/counter'

const App = () => 
{
  return (
    <div style={{height: '100vh', width: '100%', position: 'relative'}}>
    <Header />
    <Routes>
      
      <Route element={<HomePage />} path={'/'}></Route>
      
      <Route element={<ServiceSystemPage />} path='/service'></Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
    </div>
  );
}

export default App;