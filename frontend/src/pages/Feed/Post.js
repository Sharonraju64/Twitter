import { Avatar } from '@mui/material';
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import './post.css';

function post ({p}) {
    const {name, username, photo, post, profileImage} = p;
    return (
        <div className='post'>
            <div className='post_avatar'>
                <Avatar src={profileImage} />
            </div>
            <div className='post_body'>
                <div className='post_header'>
                    <div className='post_headerText'>
                        <h3>
                            {name}{" "}
                            <span className='post_headerSpecial'>
                                <VerifiedIcon className='post_badge' /> @{username}
                            </span>
                        </h3>
                    </div>
                    <div className='post_headerDescription'>
                        <p>{post}</p>
                    </div>
                    <img src={photo} alt='' width='500' />
                    <div className='post_footer'>
                        <ChatBubbleOutlineIcon className='post_footer_icon' fontSize='small' />
                        <RepeatIcon className='post_footer_icon' fontSize='small' />
                        <FavoriteBorderIcon className='post_footer_icon' fontSize='small' />
                        <PublishIcon className='post_footer_icon' fontSize='small' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default post;