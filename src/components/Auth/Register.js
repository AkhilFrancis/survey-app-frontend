import React from 'react';
import { register } from '../../services/api';
import AuthForm from './AuthForm';

const Register = () => {
  const handleSubmit = async (formData) => {
    try {
      await register(formData);
      alert('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  return <AuthForm title="Register" onSubmit={handleSubmit} />;
};

export default Register;
