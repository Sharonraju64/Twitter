import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ProtectedRoute from './pages/protectedRoute';
import PageLoading from './pages/pageLoading';
import Feed from './pages/feed';
import Explore from './pages/explore';
import Notifications from './pages/notifications';
import Messages from './pages/messages';
import Bookmarks from './pages/bookmarks';
import Lists from './pages/lists';
import Profile from './pages/profile';
import More from './pages/more';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route index element={<Feed />} />
          </Route>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}>
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
          <Route path='/page-loading' element={<PageLoading/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
