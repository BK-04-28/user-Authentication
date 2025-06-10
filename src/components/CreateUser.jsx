import React, { useState } from 'react';
import '../styles/global.css';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [showHomeButton, setShowHomeButton] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowHomeButton(false);
    setMessage('');
  };

  const validateInputs = () => {
    const { email, password, phone } = formData;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net)$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setMessage(' Invalid email format');
      return false;
    }

    if (password.length < 6) {
      setMessage(' Password must be at least 6 characters');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setMessage(' Phone number must be exactly 10 digits');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.find(user => user.email === formData.email);

    if (emailExists) {
      setMessage(' Email already exists!');
      setShowHomeButton(false);
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('User created successfully!');
    setShowHomeButton(true);

    setFormData({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  return (
    <div className="container">
      <h2 className="header">Create User</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="text">First Name</label>
        <input
          type='text'
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
          required
        />

        <label className="text">Last Name</label>
        <input
          type='text'
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleChange}
          required
        />

        <label className="text">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="text">Mobile</label>
        <input
          type='number'
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label className="text">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Create User</button>
      </form>

      {message && (
       <p className={`info-msg ${message.includes('success') ? 'success-msg' : 'error-msg'}`}>
        {message}
       </p>
        )}


      {showHomeButton && (
        <button className="go-login" onClick={() => navigate('/home')}>
          Go to HomePage
        </button>
      )}
    </div>
  );
}

export default CreateUser;
