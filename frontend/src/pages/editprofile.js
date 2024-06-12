import * as React from 'react';
import '../styles/editprofile.css';
import { Box, IconButton, Modal, TextField } from '@mui/material';
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

function EditChild({dob, setDob}){
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose= () => {
        setOpen(false);
    };

    return(
        <React.Fragment>
            <div className='birthdate-section' onClick={handleOpen}>
                <text>Edit</text>
            </div>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box>
                    
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default function EditProfile({user, loggedInUser}) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [dob, setDob] = React.useState('');

    const handleSave = () =>{
        console.log('saving');
        setOpen(false);
    }

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
                        <h2 className='header-title'>Edit Profile</h2>
                        <button className='save-btn' onClick={handleSave}>Save</button>
                    </div>
                    <form className='fill-content'>
                        <TextField className='text-feild' fullWidth label='Name' is='fullWidth' variant='filled' onChange={(e) => setName
                            (e.target.value)} defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ''} />
                        <TextField className='text-feild' fullWidth label='Bio' is='fullWidth' variant='filled' onChange={(e) => setBio
                            (e.target.value)} defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''} />
                        <TextField className='text-feild' fullWidth label='Location' is='fullWidth' variant='filled' onChange={(e) => setLocation
                            (e.target.value)} defaultValue={loggedInUser[0]?.location ? loggedInUser[0]?.location : ''} />
                        <TextField className='text-feild' fullWidth label='Website' is='fullWidth' variant='filled' onChange={(e) => setWebsite
                            (e.target.value)} defaultValue={loggedInUser[0]?.website ? loggedInUser[0]?.website : ''} />
                    </form>
                    <div className='birthdate-section'>
                        <p>Birth Date</p>
                        <p>.</p>
                        <EditChild dob={dob} setDob={setDob} />
                    </div>
                    <div className='last-section'></div>
                </Box>
            </Modal>
        </div>
    );
};
