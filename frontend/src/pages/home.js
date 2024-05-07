import React from 'react';
import Sidebar from './sidebar';
import Feed from './feed';
import Widgets from './widgets';

const Home = () => {
    return (
        <div className='app'>
            <Sidebar />
            <Feed />
            <Widgets />
        </div>
    );
};

export default Home;