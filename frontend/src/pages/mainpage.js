import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from '../pages/post';
import axios from 'axios';
import '../styles/mainpage.css';
import useLoggedinUser from '../hooks/useloggedinuser';

const MainPage = ({user}) => {
    const navigate = useNavigate();
    const [loggedInUser] = useLoggedinUser();
    const [isLoading, setIsLoading] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/post/getpost')
        .then(res => res.json())
        .then(data =>{
            setPosts(data)
        })
    }, [posts])
    const username = user?.email?.split('@')[0];

    const handleUploadCoverImage = (e) =>{
        setIsLoading(true);
        const image = e.target.files[0];
        // console.log(image);
        const formData = new FormData();
        formData.set('image',image)

        axios.post("https://api.imgbb.com/1/upload?key=00264694231da06a2a520041a073cac1", formData)
        .then(res => {
            const url = res.data.data.display_url;
            setIsLoading(false);
            if (url) {
                console.log(url);
            }
        })
    }
    const handleUploadProfileImage = (e) =>{
        setIsLoading(true);
        const image = e.target.files[0];
        // console.log(image);
        const formData = new FormData();
        formData.set('image',image)

        axios.post("https://api.imgbb.com/1/upload?key=00264694231da06a2a520041a073cac1", formData)
        .then(res => {
            const url = res.data.data.display_url;
            setIsLoading(false);
            if (url) {
                console.log(url);
            }
        })
    }

    return (
        <div>
            <ArrowBackIcon className='arrow-icon' onClick={()=>{navigate('/')}} />
            <h4>@{username}</h4>
            <div className='mainProfile'>
                <div className='profile-bio'>
                    {
                        <div>
                            <div className='coverImageContainer'>
                                <img src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverimage: 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt='' className='coverImage' />
                                <div className='hoverCoverImage'>
                                    <label htmlFor='image' className='imageIcon'>
                                        {
                                            isLoading?
                                            <LockResetIcon className='photoIcon photoIconDisabled'/>
                                            :
                                            <CenterFocusWeakIcon className='photoIcon' />
                                        }
                                    </label>
                                    <div className='imageIcon_tweetButton'>
                                        <input type='file' id='image' className='imageInput' onChange={handleUploadCoverImage} />
                                    </div>
                                </div>
                            </div>
                            <div className='avatar-img'>
                                <div className='avatarContainer'>
                                <img src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverimage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt='' className='avatar' />
                                <div className='hoverAvatarImage'>
                                    <div className='imageIcon_tweetButton'>
                                        <label htmlFor='profileImage' className='imageIcon'>
                                        {
                                            isLoading?
                                            <LockResetIcon className='photoIcon photoIconDisabled'/>
                                            :
                                            <CenterFocusWeakIcon className='photoIcon' />
                                        }
                                        </label>
                                        <div className='imageIcon_tweetButton'>
                                            <input type='file' id='profileImage' className='imageInput' onChange={handleUploadProfileImage} />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className='userInfo'>
                                    <div>
                                        <h3 className='heading-3'>
                                            {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
                                        </h3>
                                        <p className='userNameSection'>@{username}</p>
                                    </div>
                                    <div className='infoContainer'>
                                        {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}
                                        <div className='locationAndLink'>
                                            {loggedInUser[0]?.location ? <p className='sunInfo'><MyLocationIcon />{loggedInUser[0]?.location}</p> : ''}
                                            {loggedInUser[0]?.website ? <p className='sunInfo'><AddLinkIcon />{loggedInUser[0]?.website}</p> : ''}
                                        </div>
                                    </div>
                                    <h4 className='tweetsText'>Tweets</h4>
                                    <hr />
                                </div>
                                {
                                    posts.map(p=> <Post id={p._id} p={p} />)
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MainPage;