import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ProtectedRoute from './pages/protectedRoute';
import PageLoading from './pages/pageLoading';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/page-loading' element={<PageLoading/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
