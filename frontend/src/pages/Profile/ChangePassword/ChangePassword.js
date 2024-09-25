import * as React from 'react';
import './changepassword.css';
import { Box, IconButton, Modal, TextField } from'@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default function ChangePassword({user}){
    const [open, setOpen] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [conformPassword, setConformPassword] = React.useState('');

    const style={
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        bgcolor: 'background.paper',
        boxShadow: '24',
        borderRadius: 8,
    };
    
    const handleSubmit = async () =>{
        console.log(user);        
        if(password === conformPassword){
            const email = user?.email;                               
            const credential = await EmailAuthProvider.credential(email, currentPassword);
            console.log(credential);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, password)
            .then(()=>{
                window.alert('Updated Password Successfully!')
                console.log('Success');
            }).catch((error) =>{
                window.alert(JSON.stringify(error));
            });
            setOpen(false); 
        } else {
            window.alert('Password do not Match');
        }
    };

    return(
        <div>
            <button className='change-password-btn' onClick={()=> setOpen(true)}>Change Password</button>
            <Modal 
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='modal'>
                    <div className='head'>
                        <IconButton onClick={() => {setOpen(false)}}><CloseIcon /></IconButton>
                        <h1 className='head-title'>Change_Password</h1>                        
                    </div>
                    <form className='fill-content'>
                    <TextField className='text-field' type='password' fullWidth label='Current Password' id='fillwidth' variant='filled' onChange={(e) => setCurrentPassword(e.target.value)} />
                        <TextField className='text-field' type='password' fullWidth label='Password' id='fillwidth' variant='filled' onChange={(e) => setPassword(e.target.value)} />
                        <TextField className='text-field' type='password' fullWidth label='Conform Password' id='fillwidth' variant='filled' onChange={(e) => setConformPassword(e.target.value)} />
                    </form>
                    <div className='btn-changepassword'>
                        <button type='submit' onClick={handleSubmit} className='btn'>Submit</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};