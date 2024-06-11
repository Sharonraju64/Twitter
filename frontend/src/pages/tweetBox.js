import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../styles/tweetBox.css';
import useLoggedinUser from '../hooks/useloggedinuser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase';

const TweetBox = () => {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [loggedInUser] = useLoggedinUser();
    // console.log(loggedInUser);
    const [user] = useAuthState(auth);
    const email = user?.email;

    const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileimage: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

    const handleUplodeImage = (e) =>{
        setIsLoading(true);
        const image = e.target.files[0];
        // console.log(image);
        const formData = new FormData();
        formData.set('image',image)

        axios.post("https://api.imgbb.com/1/upload?key=00264694231da06a2a520041a073cac1", formData)
        .then(res => {
            setImageURL(res.data.data.display_url);
            console.log(res.data.data.display_url);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const handleTweet = (e) =>{
        e.preventDefault();
        if(user.providerData[0].providerId === 'password'){
            fetch(`http://localhost:5000/api/user/loggedinuser?email=${email}`)
            .then(res => res.json())
            .then(data =>{
                setName(data[0]?.name)
                setUserName(data[0]?.username)
            })
        }
        else{
            setName(user?.displayName);
            setUserName(email?.split('@')[0])
        }
        if (name) {
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageURL,
                username: username,
                name: name,
                email: email
            }
            console.log(userPost);
            setPost('');
            setImageURL('');
            fetch('http://localhost:5000/api/post/post', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userPost)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
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
                        value={post}
                        required
                    />
                </div>
                <div className='imageIcon_tweetButton'>
                    <label htmlFor='image' className='imageIcon'>
                        {
                            isLoading? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateIcon />}</p>
                        }
                    </label>
                    <input
                        type='file'
                        id='image'
                        className='imageInput'
                        onChange={handleUplodeImage}
                    />
                    <Button className='tweetBox__tweetButton' type='submit'>Tweet</Button>
                </div>
            </form>     
        </div>
    );
};

export default TweetBox;