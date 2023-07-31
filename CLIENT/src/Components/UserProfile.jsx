import React, { useState } from 'react';
import { Avatar, AppBar, Toolbar, Typography, IconButton, TableContainer, TableCell, TableRow, Table, TableBody, Dialog, Button, TextField, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Batman from '../Images/Batman.png'
import { useSelector } from 'react-redux';
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
    textAlign: "right",
    color: "white"
}))

const StyledTableCellTitle = styled(TableCell)(() => ({
    fontWeight: "bold",
    color: "white"
}))

const StyledTextField = styled(TextField)(() => ({
    marginBottom: '20px'
}))

export default function UserProfile(props) {

    const { handleClose } = props
    const user = useSelector((state) => state.user.user)

    const [open, setOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: user.email,
        firstName: user.firstName,
        name: user.name
    })

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSaveNewValue = () => {
        console.log(userInfo)
    }

    return (
        <div style={{ backgroundColor: "black", height: "100%" }}>
            <Dialog
                open={open}
            >
                <div style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                    <span style={{marginLeft:"10px", fontWeight:"bold"}}>Modifier mon profil</span>
                    <IconButton
                    onClick={()=> setOpen(false)}
                    > <CloseIcon/> 
                    </IconButton>
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>

                    <StyledTextField
                        onChange={handleChange}
                        name='email'
                        label="Adresse Email"
                        type="text"
                        defaultValue={user.email} />
                    <StyledTextField
                        onChange={handleChange}
                        name='name'
                        label="Nom"
                        type="text"
                        defaultValue={user.name} />
                    <StyledTextField
                        onChange={handleChange}
                        name='firstName'
                        label="Prénom"
                        type="text"
                        defaultValue={user.firstName} />


                </div>

                <Button sx={{color:"black", fontWeight:"bold"}} onClick={handleSaveNewValue}> Sauvegarder</Button>


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
                    <Avatar sx={{ height: "150px", width: "150px", cursor: "pointer", margin: "20px" }} alt="Travis Howard" src={Batman} />
                </div>

                <TableContainer sx={{ width: "60%", marginBottom: "30px" }} >
                    <Table aria-label="customized table">
                        <TableBody>
                            <TableRow>
                                <StyledTableCellTitle>
                                    Adresse Email
                                </StyledTableCellTitle>
                                <StyledTableCell >
                                    {user.email}
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCellTitle>
                                    Nom
                                </StyledTableCellTitle>
                                <StyledTableCell  >
                                    {user.name}
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCellTitle>
                                    Prénom
                                </StyledTableCellTitle>
                                <StyledTableCell >
                                    {user.firstName}
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </TableContainer>

                <Button
                    onClick={() => setOpen(true)}
                    className='myButton'>
                    Modifier le profil
                </Button>
            </div>

        </div>
    );
}