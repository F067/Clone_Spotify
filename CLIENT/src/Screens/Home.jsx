import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Home() {

  return (
    <Card sx={{
      maxWidth: 345,
      fontWeight: 'bold'
    }}>
      <CardMedia
        component="img"
        image="../Images/Music.png"
        alt="album icon"
      />
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="This is red Hot Chili Peppers"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" >
          The Red Hot Chili Peppers, commonly abbreviated as RHCP, are an American rock band formed in Los Angeles in 1982,[1] comprising vocalist Anthony Kiedis, bassist Flea, drummer Chad Smith, and guitarist John Frusciante.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Home