import logo from './logo.svg';
import './App.css';

import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Project from './pages/Project';
import Dashboard from './pages/Dashboard';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  return (
    <div >
      <Toaster position="top-center" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"} />} />
        <Route path='/project' element={<Project />} />
        <Route path='/dashboard' element={isAuthToken ? <Dashboard /> : <Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
