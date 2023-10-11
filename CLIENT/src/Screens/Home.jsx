import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';

function Home() {

  const user = useSelector((state) => state.user.user)
  const [isLiked, setIsLiked] = useState(false)

  const handleLikedSong = () => {
    setIsLiked(!isLiked)
  }


  return (
    user &&
    <Card
      sx={{
        bgcolor: 'black',
        color: 'white',
        borderRadius: '10px',
      }}>
      <CardMedia
        component="img"
        image="../Images/Music.png"
        alt="album icon"
      />
      <span style={{ fontWeight: 'bold', margin: '20px' }}> This Is Red Hot Chili Peppers</span>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <FavoriteIcon 
        onClick={handleLikedSong}
        sx={{color: isLiked ? "#FB3741" : "#FFFF" }}
         />
        <MoreVertIcon />
      </CardActions>
    </Card>
  )
}

export default Home