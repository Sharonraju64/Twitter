import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {TwitterTweetEmbed, TwitterTimelineEmbed} from 'react-twitter-embed';
import '../styles/widgets.css';

const Widgets = () => {
    return (
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className='widgets_searchIcon' />
                <input type='text' placeholder='SearchTwitter' />
            </div>
            <div className='widgets_wedgetContainer'>
                <h2>What's happening</h2>   
            </div>

            <TwitterTweetEmbed 
                tweetId={'1557187138352861186'}
            />
            <TwitterTimelineEmbed 
                sourceType='profile'
                screenName='elonmusk'
                options={{height: 400}}
            />
        </div>
    );
};

export default Widgets;