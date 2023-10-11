import React, { useState, useEffect } from 'react'
import { Avatar, Stack, Dialog, Slide } from '@mui/material';
import UserProfile from './UserProfile';
import { useDispatch, useSelector } from "react-redux";
import { setReset } from "../Store/User/slice";
import { getImageFromUser } from '../Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UserAvatarIcon() {

    const [open, setOpen] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        setAvatar(getImageFromUser(user))
    }, [user])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogOut = () => {
        setOpen(false)
        dispatch(setReset())
        localStorage.removeItem("JWT")
    }

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
                    handleLogOut={handleLogOut}
                />

            </Dialog>
            {
                user &&
                <Stack
                    className='icon'
                    onClick={handleClickOpen} direction="row" spacing={2}
                >
                    <Avatar alt="icon" src={avatar} sizes='80px' />
                </Stack>
            }

        </div>
    )
}

export default UserAvatarIcon