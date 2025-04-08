import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
// Pages

import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light text-primary dark:bg-primary-dark dark:text-light">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;