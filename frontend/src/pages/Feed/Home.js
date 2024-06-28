import React from 'react';
import { useUserAuth } from "../../Firebase/UserAuthContext";
import { useNavigate } from "react-router";
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Widgets from '../Widgets/Widgets';

const Home = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () =>{
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.log(error.message);            
        }
    }
    return (
        <div className='app'>
            <Sidebar handleLogout={handleLogout} user={user}/>
            <Outlet />
            <Widgets />
        </div>
    );
};

export default Home;