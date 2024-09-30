import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ChatBot, {Loading} from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import twitterImage from '../../assets/twitterIcon.png';
import './chatbot.css';

const Chatbot =({steps, triggerNextStep}) => {
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(false);
    const [tweets, setTweets] = useState([]);

    const triggerNext = () =>{
        setTrigger(true);
        triggerNextStep();
    };

    useEffect(()=>{
        const input = steps.search.value;
        const getTweets = async() =>{
            const responce = await axios.get(`http://localhost:5000/gettweets?q=${input}`);
            if(responce && responce.length > 0){
                setLoading(false);
                setTweets(responce.data);
            } else {
                setLoading(false);
                setTweets('Not Found.');
            }
        };
        getTweets();
    }, [steps]);

    return(
        <div className='tweet-container'>
            {loading ? <Loading /> : tweets.map((tweet, index) => (
                  <div className='tweet' key={index}><li>{tweet.text}</li><br></br></div>
                ))}
            {!loading && (
                <div style={{textAlign: 'center', marginTop: 20}}>
                    {!trigger && (
                        <button onClick={triggerNext}>
                            Search Again
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

Chatbot.propTypes = {
    steps: propTypes.object.isRequired,
    triggerNextStep: propTypes.func.isRequired,
};

const TwitterChatbot = () => {

    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#50b7f5',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#50b7f5',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
      };

    return (
        <div className="chatbot">
            <ThemeProvider theme={theme}>
                <ChatBot 
                    steps={[
                        {
                            id: '0',
                            message: 'Type something to Search Tweets. (Ex.: Cricket)',
                            trigger: 'search',
                        },
                        {
                            id: 'search',
                            user: true,
                            trigger: '3'
                        },
                        {
                            id: '3',
                            component: <Chatbot />,
                            waitAction: true,
                            trigger:'0'
                        }
                    ]}
                    floating={true}
                    style={{height: "35.5vw"}}
                    botDelay={1000}
                    headerTitle="Twitter ChatBot"
                    botAvatar={twitterImage}
                />
            </ThemeProvider>
        </div> 
    );
    
};

export default TwitterChatbot;