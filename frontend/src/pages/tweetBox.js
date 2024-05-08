import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../styles/tweetBox.css';

const TweetBox = () => {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleTweet = (e) =>{
        e.preventDefault();
        console.log(post);
    }

    return (
        <div className='tweetBox'>
            <form onSubmit={handleTweet}>
                <div className='tweetBox__input'>
                    <Avatar src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' />
                    <input
                        type='text'
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
                <div className='imageIcon_tweetButton'>
                    <label htmlFor='image' className='imageIcon'>
                        <AddPhotoAlternateIcon />
                    </label>
                    <input
                        type='file'
                        id='image'
                        className='imageInput'
                    />
                    <Button className='tweetBox__tweetButton' type='submit'>Tweet</Button>
                </div>
            </form>     
        </div>
    );
};

export default TweetBox;