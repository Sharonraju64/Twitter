import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Feed/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/protectedRoute';
import { UserAuthContextProvider } from "./Firebase/UserAuthContext";
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notification/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Lists from './pages/Lists/Lists';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import ForgetPassword from './pages/Login/ForgetPassword';
import ChangePassword from './pages/Profile/ChangePassword/ChangePassword';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<Feed />} />
          </Route>
          <Route path='/home' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }>
            <Route path='feed' element={<Feed />} />
            <Route path='explore' element={<Explore />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='messages' element={<Messages />} />
            <Route path='bookmarks' element={<Bookmarks />} />
            <Route path='lists' element={<Lists />} />
            <Route path='profile' element={<Profile />} />
            <Route path='more' element={<More />} />
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgetpassword' element={<ForgetPassword/>}/>
          <Route path='/changepassword' element={<ChangePassword />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
