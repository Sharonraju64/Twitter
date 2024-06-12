import * as React from 'react';
import '../styles/editprofile.css';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    bgcolor: 'background.paper',
    boxShadow: '24',
    borderRadius: 8,
}

export default function EditProfile({user, loggedInUser}) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [dob, setDob] = React.useState('');

    return (
        <div>
            <button className='Edit-profile-btn' onClick={()=> setOpen(true)}>EditProfile</button>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='modal'>
                    <div className='header'>
                        <IconButton onClick={() => {setOpen(false) }}><CloseIcon /></IconButton>
                    </div>
                    <div className='fill-content'></div>
                    <div className='birthdate-section'></div>
                    <div className='last-section'></div>
                </Box>
            </Modal>
        </div>
    );
};
