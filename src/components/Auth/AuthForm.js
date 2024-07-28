import React, { useState } from 'react';

const AuthForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: title === 'Register' ? '' : undefined,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {title === 'Register' && (
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={formData.name} />
        </div>
      )}
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} value={formData.email} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} value={formData.password} />
      </div>
      <button type="submit">{title}</button>
    </form>
  );
};

export default AuthForm;
