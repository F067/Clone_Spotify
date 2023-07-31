import React, { useState } from 'react'
import { Avatar, Stack, Dialog, Slide } from '@mui/material';
import UserProfile from './UserProfile';
import Batman from '../Images/Batman.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UserAvatarIcon() {


    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log("caca")
    };

    return (
        <div  >
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <UserProfile
                    handleClose={handleClose}
                />

            </Dialog>

            <Stack
                className='icon'
                onClick={handleClickOpen} direction="row" spacing={2}>
                <Avatar alt="Travis Howard" src={Batman} />
            </Stack>
        </div>
    )
}

export default UserAvatarIcon