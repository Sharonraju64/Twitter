import React from 'react';
import '../styles/sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOptions from './sidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreIcon from '@mui/icons-material/More'
import DoneIcon from '@mui/icons-material/Done';


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <TwitterIcon className='sidebar_twittericon' />
            <SidebarOptions active Icon={HomeIcon} text='Home' />
            <SidebarOptions active Icon={SearchIcon} text='Explore' />
            <SidebarOptions active Icon={NotificationsIcon} text='Notifications' />
            <SidebarOptions active Icon={MailOutlineIcon} text='Messages' />
            <SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks' />
            <SidebarOptions active Icon={ListAltIcon} text='Lists' />
            <SidebarOptions active Icon={PermIdentityIcon} text='Profile' />
            <SidebarOptions active Icon={MoreIcon} text='More' />
        </div>
    );
};

export default Sidebar;