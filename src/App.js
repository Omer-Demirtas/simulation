import React from "react";

import { Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from "./pages/home";
import ServiceSystemPage from "./pages/serviceSystems";
//import { useSelector, useDispatch } from 'react-redux'
//import { decrement, increment } from './feature/counter/counter'


const Header = () =>
{
  return (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="service">Post</Link></li>
    </ul>
  )
}

const App = () => 
{
  //const count = useSelector((state) => state.counter.value);
  //const dispatch = useDispatch();

  return (
    <>
    <Header />
    <Routes>
      <Route element={<HomePage />} path={'/'}></Route>
      
      <Route element={<ServiceSystemPage />} path='/service'></Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;