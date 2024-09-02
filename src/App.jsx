import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import GameMechanics from './Components/GameMechanics'; // Ensure the path is correct
import AboutUs from './Components/AboutUs';
import './Design/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ColorSequenceGame" element={<GameMechanics />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
