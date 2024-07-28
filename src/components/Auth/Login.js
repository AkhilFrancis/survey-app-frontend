import React, { useContext } from 'react';
import { getProfile, login } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await login(formData);
      const profileResponse = await getProfile();
      console.log(profileResponse.data);
      setUser(profileResponse.data);
      navigate('/surveys');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return <AuthForm title="Login" onSubmit={handleSubmit} />;
};

export default Login;
