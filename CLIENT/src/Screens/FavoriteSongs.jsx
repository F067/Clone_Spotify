import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useSelector } from 'react-redux';

function FavoriteSongs() {

  const user = useSelector((state) => state.user.user)
  const [isPlayed, setIsPlayed] = useState(false)

  const handlePlay = () => {
    setIsPlayed(!isPlayed)
  }
  return (
    user &&
    <List
      sx={{
        width: '100%',
        bgcolor: 'black',
        color: 'white',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid #FB3741 1px', width: '98%' }}>
        <ListItemAvatar >
          <Avatar>
            {
              !isPlayed ?
                <PlayCircleIcon
                  className='icon'
                  onClick={() => handlePlay()}
                  style={{ fontSize: 30, color: "#FB3741" }}
                />
                :
                <PauseCircleIcon
                  className='icon'
                  onClick={() => handlePlay()}
                  style={{ fontSize: 30 }}
                />
            }
          </Avatar>
        </ListItemAvatar>
        <p>Title</p>
        <p>Album</p>
        <p>Date d'ajout</p>
        <p>Durée du titre</p>
      </ListItem>
    </List>
  )
}

export default FavoriteSongs