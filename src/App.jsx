import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Screens/Home';
import Playlist from './Screens/Playlist';
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
