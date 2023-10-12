import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LanguageIcon from '@mui/icons-material/Language';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChairIcon from '@mui/icons-material/Chair';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Music from '../Images/Music.png';

const drawerWidth = 300;

export default function Sidebar() {

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const menu = [
    { title: "Accueil", icon: ChairIcon, key: "Home", link:"/Home" },
    { title: "Rechercher", icon: SearchIcon, key: "Search", link:"/Search"  },
    { title: "Bibliothèque", icon: SubscriptionsIcon, key: "Library", link:"/Library"  },
  ];

  const menu2 = [
    { title: "Créer une playlist", icon: AddToPhotosIcon, key: "Playlist", link:"/Playlist"  },
    { title: "Titres likés", icon: FavoriteIcon, key: "FavoriteSongs", link:"/FavoriteSongs"  },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname
    const pathSegments = currentPath.split("/")
    let path = null
    if (menu.find(el => el.key === pathSegments[pathSegments.length - 1])) {
      setSelectedMenuItem(menu.find(el => el.key === pathSegments[pathSegments.length - 1]).title)
    }
    else {
      if (menu2.find(el => el.key === pathSegments[pathSegments.length - 1])) {
        setSelectedMenuItem(menu2.find(el => el.key === pathSegments[pathSegments.length - 1]).title)
      }
    }
  }, [])

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleLanguage = () => {
    console.log("coucou");
  };

  return (
    <div
      style={{
        position: "relative",
        width: drawerWidth,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        backgroundColor: 'black',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
        <img
          src={Music}
          alt="Icône de l'application"
          style={{ height: "40px", width: "40px" }}
        />
        <span style={{ marginLeft: 10, fontSize: 25, fontWeight: "bold" }}>
          This Is Spotify
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 20, padding: 10 }}>
        {menu.map((el, index) => {
          const Icon = el.icon;
          const isSelected = selectedMenuItem === el.title;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                cursor: "pointer",
                color: isSelected && "#FB3741",
              }}
              onClick={() => handleMenuItemClick(el.title)}
            >
              <Icon style={{ fontSize: 28 }} />
              <span className='menu-item'>
                <Link to={el.link}>{el.title}</Link>
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 20, padding: 10 }}>
        {menu2.map((el, index) => {
          const Icon = el.icon;
          const isSelected = selectedMenuItem === el.title;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                cursor: "pointer",
                color: isSelected && "#FB3741",
              }}
              onClick={() => handleMenuItemClick(el.title)}
            >
              <Icon style={{ fontSize: 28 }} />
              <span className='menu-item'>
                <Link to={el.link}>{el.title}</Link>
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "auto", fontSize: 10, color: "#c3c3c3", padding: 10 }}>
        <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: 5 }}>
          <a href="#">Légal</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a style={{ marginBottom: 5 }} href="#">Protection des données</a>
          <a style={{ marginBottom: 5 }} href="#">Paramètres des cookies</a>
          <a style={{ marginBottom: 5 }} href="#">A propos des pubs</a>
          <a style={{ marginBottom: 5 }} href="#">Cookies</a>
        </div>
      </div>
      <div style={{ marginTop: 30, padding: 10 }}>
        <Button className='myButton' onClick={() => handleLanguage()} style={{ fontSize: 12 }} variant='outlined'>
          <LanguageIcon style={{ marginRight: 5, fontSize: 20 }} />Français
        </Button>
      </div>
    </div>
  );
}
