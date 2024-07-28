import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../services/api';
import './Header.css'; // Importing the CSS file for Header styling

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header>
      <nav>
        <ul className="left-nav">
          {user && <li>Welcome, {user.name}!</li>}
        </ul>
        <ul className="right-nav">
          <li><Link to="/surveys">Surveys</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              {user.isAdmin && <li><Link to="/create-survey">Create Survey</Link></li>}
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
