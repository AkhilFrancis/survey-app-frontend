import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Survey App</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/surveys">View Surveys</Link>
    </div>
  );
};

export default Home;
