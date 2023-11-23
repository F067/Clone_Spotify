import axios from 'axios'
import ledz from '../Images/ledZep.png'
import Drums from '../Images/Drums.png'
import hendrix from '../Images/hendrix.png'
import ElecG from '../Images/ElecG.png'

export const callPost = async (url, data, token) => {
  try {
    let headers = {};
    if (token) {
      // si token ajoute le dans le headers
      headers.Authorization = `Bearer ${token}`
    }
    const response = await axios.post("http://localhost:3001" + url, data, { headers: headers });
    if (response.status === 201) {
      // La requête a été traitée avec succès
      return response.data;
    } else {
      // La requête a échoué avec un statut autre que 201
      throw new Error(response.status);
    }
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    if (error.response && error.response.data && error.response.data.error) {
      // Si le backend a renvoyé un message d'erreur
      throw new Error(error.response.data.error);
    } else {
      // Si aucune erreur spécifique du backend n'est disponible
      throw new Error(error.message);
    }
  }
}

export const callPut = async (url, data, token) => {
  try {
    let headers = {};
    if (token) {
      // si token ajoute le dans le headers
      headers.Authorization = `Bearer ${token}`
    }
    const response = await axios.put("http://localhost:3001" + url, data, { headers: headers });
    if (response.status === 201) {
      // La requête a été traitée avec succès
      return response.data;
    } else {
      // La requête a échoué avec un statut autre que 201
      throw new Error(response.status);
    }
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    if (error.response && error.response.data && error.response.data.error) {
      // Si le backend a renvoyé un message d'erreur
      throw new Error(error.response.data.error);
    } else {
      // Si aucune erreur spécifique du backend n'est disponible
      throw new Error(error.message);
    }
  }
}

export const callDelete = async (url, data, token) => {
  try {
    let headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.delete("http://localhost:3001" + url, { data, headers });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(`Backend error: ${error.response.data.error}`);
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const getImageFromUser = (user) => {
  if (user) {
    switch (user.avatar) {
      case "hendrix":
        return hendrix
        break;
      case "ledz":
        return ledz
        break;
      case "Drums":
        return Drums
        break;
      case "ElecG":
        return ElecG
        break;
      default:
        return ElecG
        break;
    }
  }
}

export const getThisIsFromSpotify = async (spotifyToken, limit) => {
  try {
    const res = await axios.get(
      "https://api.spotify.com/v1/search?query=this+is&type=playlist&include_external=audio&locale=fr-FR%2Cfr%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=" + limit, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
    );
    if (res) {
      const playlists = res.data.playlists.items;
      const shuffledPlaylists = shuffleArray(playlists);
      const initialLocalData = shuffledPlaylists.map(item => ({ ...item, addedToLibrary: false }));
      return initialLocalData
    }
  } catch (error) {
    console.error("Erreur lors de la requête à l'API Spotify : ", error);
  }
}


export const getPlaylistTracks = async (spotifyToken, playlistId) => {
  try {
    const res = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    if (res) {
      return res.data.items
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des titres de la playlist : ", error);
  }
}

export const getSeveralTracks = async (spotifyToken, trackIds) => {
  try {
    const ids = trackIds.join(',')
    const res = await axios.get(`https://api.spotify.com/v1/tracks?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      }
    })
    if (res) {
      return res.data.tracks
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des titres : ", error);
  }
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getPlaylistsFromSpotify = async (ids, spotifyToken, token) => {
  try {
    const res = await callPost('/users/getAllPlaylistsFromLibrary', { libIds: ids, spotifyToken }, token)
    if (res) {
      return res.data
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des playlists : ", error);
  }
}

export const getSearchFromSpotify = async (spotifyToken, value) => {
  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?query=this+is+${value}&type=playlist&locale=fr-FR%2Cfr%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=50`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
    );
    if (res) {
      const playlists = res.data.playlists.items;
      const initialLocalData = playlists.map(item => ({ ...item, addedToLibrary: false }));
      return initialLocalData
    }
  } catch (error) {
    console.error("Erreur lors de la requête à l'API Spotify : ", error);
  }
}