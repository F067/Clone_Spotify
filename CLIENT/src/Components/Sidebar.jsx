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


export default function Sidebar() {

  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false)

  const menu = [
    { title: "Accueil", icon: ChairIcon, key: "Home", link: "/", name: "" },
    { title: "Rechercher", icon: SearchIcon, key: "Search", link: "/SearchPlaylists", name: "SearchPlaylists" },
    { title: "Bibliothèque", icon: SubscriptionsIcon, key: "Library", link: "/Library", name: "Library" },
  ];

  const menu2 = [
    { title: "Créer une playlist", icon: AddToPhotosIcon, key: "Playlist", link: "/Playlist", name: "Playlist" },
    { title: "Titres likés", icon: FavoriteIcon, key: "Liked", link: "/Liked", name: "Liked" },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname
    const pathSegments = currentPath.split("/")
    if (menu.find(el => el.name === pathSegments[pathSegments.length - 1])) {
      setSelectedMenuItem(menu.find(el => el.name === pathSegments[pathSegments.length - 1]).title)
    }
    else {
      if (menu2.find(el => el.name === pathSegments[pathSegments.length - 1])) {
        setSelectedMenuItem(menu2.find(el => el.name === pathSegments[pathSegments.length - 1]).title)
      }
    }
  }, [])

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleClickMobile = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div
      className={!drawerOpen ? 'sidebar-style' : 'sidebar-style-mobile'}
    >
      <div style={{ display: "flex", alignItems: "center", padding: 10, justifyContent: 'center' }}>
        <img
          src={Music}
          alt="Icône de l'application"
          style={{ height: "40px", width: "40px" }}
          onClick={() => handleClickMobile()}
          className='no-click'
        />
        <span className='title-resolution' style={{ marginLeft: 10, fontSize: 25, fontWeight: "bold" }}>
          Musify
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 20, padding: 10 }}>
        {menu.map((el, index) => {
          const Icon = el.icon;
          const isSelected = selectedMenuItem === el.title;
          return (
            <Link to={el.link} key={index}>
              <div

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
                <span className={drawerOpen ? "menu-item" : "menu-item mobile"}>
                  {el.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 20, padding: 10 }}>
        {menu2.map((el, index) => {
          const Icon = el.icon;
          const isSelected = selectedMenuItem === el.title;
          return (
            <Link to={el.link} key={index}>
              <div
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
                <span className={drawerOpen ? "menu-item" : "menu-item mobile"}>
                  {el.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>


    </div>
  );
}

