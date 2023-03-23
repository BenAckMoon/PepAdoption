import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import HomePageLoggedIn from './components/HomePageLoggedIn';
import ProfilePage from './components/ProfilePage';
import ProfileSetting from './components/ProfileSetting';
import MyPets from './components/MyPets';
import SearchPage from './components/SearchPage';
import AddPetForm from './components/AddPetForm';
import Dashboard from './components/Dashboard';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import './App.css'


function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/ourpets">Our Pets</Link>
            <Link to="/search">Search</Link>
          </>
        
          <button onClick={handleLogin}>Log in</button>
      
      </nav>

      <Routes>
        {loggedIn ? (
          <Route path="/" element={<HomePageLoggedIn />} />
        ) : (
          <Route path="/" element={<HomePage loggedIn={loggedIn} />} />
        )}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/admin/addingpet" element={<AddPetForm/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/ourpets" element={<PetList />} />
        <Route path="/admin/pets" element={<PetList />} />
      </Routes>
    </Router>
  );
}

export default App;
