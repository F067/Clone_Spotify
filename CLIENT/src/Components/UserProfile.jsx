import React, { useState } from 'react';
import { Avatar, AppBar, Toolbar, Typography, IconButton, TableContainer, TableCell, TableRow, Table, TableBody, Dialog, Button, TextField, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Drums from '../Images/Drums.png'
import hendrix from '../Images/hendrix.png'
import ledz from '../Images/ledZep.png'
import ElecG from '../Images/ElecG.png'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setReset } from '../Store/User/slice';
import { styled } from "@mui/material/styles";
import { callPut, callDelete, getImageFromUser } from '../Utils';
import { toast } from 'react-toastify';


const StyledTableCell = styled(TableCell)(() => ({
    textAlign: "right",
    color: "white"
}))

const StyledTableCellTitle = styled(TableCell)(() => ({
    fontWeight: "bold",
    color: "white"
}))

const StyledTextField = styled(TextField)(() => ({
    marginBottom: '20px',
    width: "40vw"
}))

export default function UserProfile(props) {

    const { handleClose, handleLogOut } = props
    const user = useSelector((state) => state.user.user)
    const token = useSelector((state) => state.user.token)

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: user?.email,
        firstName: user?.firstName,
        name: user?.name
    })
    const avatars = [
        { name: "ElecG", icon: ElecG },
        { name: "Drums", icon: Drums },
        { name: "ledz", icon: ledz },
        { name: "hendrix", icon: hendrix }
    ]
    const [avatarSelected, setAvatarSelected] = useState(avatars.find(el => el.icon == getImageFromUser(user)))
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSaveNewValue = async () => {
        const resApi = await callPut("/users/updateUser", {
            firstName: userInfo.firstName,
            name: userInfo.name,
            email: userInfo.email,
            avatar: avatarSelected.name
        }, token);
        if (resApi) {
            setOpen(false)
            dispatch(setUser(resApi.user))
        }
    }

    const handleDeleteAccount = async () => {
        const resApi = await callDelete("/users/deleteUser", {

        }, token)
        if (resApi) {
            toast.success("Compte supprimé !")
            dispatch(setReset())
            localStorage.removeItem("JWT")
            setOpenConfirmModal(false)
            setOpen(false)
            handleClose()
        }

    }

    return (
        <div style={{ backgroundColor: "black", height: "100%" }}>

            <Dialog sx={{ backgroundColor: "black" }} open={openConfirmModal}>
                <div style={{ display: "flex", justifyContent: "space-between", textAlign: 'center', alignItems: "center" }}>
                    <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Suppression</span>
                    <IconButton
                        onClick={() => setOpenConfirmModal(false)}
                    > <CloseIcon />
                    </IconButton>
                </div>
                <div style={{ margin: "25px" }}>
                    Etes-vous sûr de vouloir supprimer votre compte ? cette action est irreversible et implique aussi la suppression de toutes vos playlists ainsi que de vos titres likés
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "10px" }}>
                    <Button
                        onClick={() => handleDeleteAccount()}
                        className='myButton red'>
                        Supprimer mon compte
                    </Button>
                </div>
            </Dialog >

            <Dialog
                open={open}
                maxWidth={'l'}
            >
                <div style={{ padding: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Modifier mon profil</span>
                        <IconButton
                            onClick={() => setOpen(false)}
                        > <CloseIcon />
                        </IconButton>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <StyledTextField
                            onChange={handleChange}
                            name='email'
                            label="Adresse Email"
                            type="text"
                            defaultValue={user?.email} />
                        <StyledTextField
                            onChange={handleChange}
                            name='name'
                            label="Nom"
                            type="text"
                            defaultValue={user?.name} />
                        <StyledTextField
                            onChange={handleChange}
                            name='firstName'
                            label="Prénom"
                            type="text"
                            defaultValue={user?.firstName} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {
                            avatars.map((avatar, index) => {
                                return (
                                    <Avatar
                                        key={index}
                                        style={{ margin: "5px", border: avatarSelected.icon === avatar.icon ? '2px solid green' : null }}
                                        className='icon' alt="icon"
                                        src={avatar.icon}
                                        onClick={() => setAvatarSelected(avatar)} />
                                )
                            })
                        }
                    </div>
                    <Button sx={{ color: "black", fontWeight: "bold" }} onClick={handleSaveNewValue}> Sauvegarder</Button>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setOpenConfirmModal(true)}
                            className='myButton red'>
                            Supprimer mon compte
                        </Button>
                    </div>

                </div>
            </Dialog>
            <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                <Toolbar>

                    <Typography sx={{ ml: 2, flex: 1, fontWeight: "bold" }} variant="h6" component="div">
                        Mon profil
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div >
                    <Avatar sx={{ height: "150px", width: "150px", cursor: "pointer", margin: "20px" }} alt="Travis Howard" src={getImageFromUser(user)} />
                </div>

                <div className="table-profile">
                    <TableContainer >
                        <Table aria-label="customized table"  >
                            <TableBody>
                                <TableRow>
                                    <StyledTableCellTitle>
                                        Adresse Email
                                    </StyledTableCellTitle>
                                    <StyledTableCell >
                                        {user?.email}
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCellTitle>
                                        Nom
                                    </StyledTableCellTitle>
                                    <StyledTableCell  >
                                        {user?.name}
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCellTitle>
                                        Prénom
                                    </StyledTableCellTitle>
                                    <StyledTableCell >
                                        {user?.firstName}
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button
                        onClick={() => setOpen(true)}
                        className='myButton'>
                        Modifier le profil
                    </Button>
                    <Button
                        onClick={handleLogOut}
                        className='myButton red'>
                        Se deconnecter
                    </Button>
                </div>

            </div>

        </div >
    );
}