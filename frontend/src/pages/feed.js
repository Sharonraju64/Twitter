import React from 'react';
import '../styles/feed.css';
import TweetBox from './tweetBox';
const Feed = () => {
    return (
        <div className='feed'>
            <div className='feed__header'>
                <h2>Home</h2>
            </div>
            <TweetBox />
        </div>
    );
};

export default Feed;