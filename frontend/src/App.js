import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './components/Feed';
import Coin from './pages/Coin';
import Trades from './pages/Trades';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Feed />} />
          <Route path="/:id" element={<Coin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trades" element={<Trades />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
