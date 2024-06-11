import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import '../styles/mainpage.css';
import useLoggedinUser from '../hooks/useloggedinuser';

const MainPage = ({user}) => {
    const navigate = useNavigate();
    const [loggedInUser] = useLoggedinUser();
    const username = user?.email?.split('@')[0];
    const handleUploadCoverImage = ()=>{
        console.log("object");
    }

    return (
        <div>
            <ArrowBackIcon className='arrow-icon' onClick={()=>{navigate('/')}} />
            <h4>@{username}</h4>
            <div className='mainProfile'>
                <div className='profile-bio'>
                    {
                        <div className='coverImageContainer'>
                            <img src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverimage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt='' className='coverImage' />
                            <div className='hoverCoverImage'>
                                <div className='imageIcon_tweetButton'>
                                    <h2>hello</h2>
                                    <input type='file' id='image' className='imageInput' onChange={handleUploadCoverImage} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MainPage;