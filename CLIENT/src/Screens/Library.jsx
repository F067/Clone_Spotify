import React from 'react';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';

function Library() {
  const user = useSelector((state) => state.user.user);
  const selectedPlaylist = useSelector((state) => state.user.playlistLibrary);
  console.log(selectedPlaylist)

  return (
    user && selectedPlaylist && (
      <Paper sx={{ backgroundColor: '#121212' }} className="scrollable-paper">
        <div className='thisIs-container'>
          {selectedPlaylist.map((item, index) => (
            <div className="card" key={index}>
              <div>
                <img src={item.images[0].url} alt={item.name} style={{ width: '100%' }} />
                <h2 style={{ fontWeight: 'bold' }}>{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    )
  );
}

export default Library;
