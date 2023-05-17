import { Link, Route, Routes } from 'react-router-dom';
import { Home } from "./Components/Home";
import { Orders } from "./Components/Orders";
import { Saved } from "./Components/Saved";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/saved">Saved</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Saved" element={<Saved />} />
      </Routes>
    </>
  );
}

export default App;
