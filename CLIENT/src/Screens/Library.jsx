import React from 'react';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { toast } from 'react-toastify';
import { setPlaylistLibrary } from '../Store/User/slice';
function Library() {
  const user = useSelector((state) => state.user.user);
  const selectedPlaylist = useSelector((state) => state.user.playlistLibrary);

  const dispatch = useDispatch()

  const handleRemoveFromLibrary = (index) => {

    const updatedPlaylist = [...selectedPlaylist];
    const removedPlaylist = updatedPlaylist.splice(index, 1)[0];
    if (removedPlaylist) {
      dispatch(setPlaylistLibrary(updatedPlaylist));
      toast.success(`La playlist "${removedPlaylist.name}" a été retirée de la bibliothèque.`);
    }
  }

  return (
    user && selectedPlaylist && (
      <div className="scrollable-paper">
        <div className='thisIs-container'>
          {selectedPlaylist.length > 0 ? (
            selectedPlaylist.map((item, index) => (
              <div className="card" key={index}>
                <div>
                  <img src={item.images[0].url} alt={item.name} style={{ width: '100%' }} />
                  <h2 style={{ fontWeight: 'bold' }}>{item.name}</h2>
                  <h3 style={{ display: "flex", justifyContent: 'flex-end' }}>
                    <PlaylistRemoveIcon
                      onClick={() => { handleRemoveFromLibrary(index) }} />
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <span style={{color:"white", fontSize:"30px", fontWeight:"bold"}}>Oups Il n'y a pas encore de playlist ici !</span>
          )}
        </div>
      </div>
    )
  );
}

export default Library;
