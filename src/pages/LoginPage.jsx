import React, { useState } from 'react';
import '../styles/global.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';


function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowForgot(false);
    setMessage('');
    setMessageType('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

    if (!user) {
      setMessage(' User not found. Please register.');
      setMessageType('error');
    } else if (user.password !== formData.password) {
      setMessage(' Invalid Password');
      setMessageType('error');
      setShowForgot(true);
    } else {
      setMessage('Login successful!');
      setMessageType('success');
      localStorage.setItem('currentUser', JSON.stringify(user));
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
  };

  return (
    <div className='container'>
      <h2 className='header'>Login</h2>
      <form onSubmit={handleLogin} className='form'>
      <div className="input-icon-wrapper">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
       <MdEmail className="right-icon" />
     </div>
    <div className="input-icon-wrapper">
       <input
         type={showPassword ? "text" : "password"}
         name="password"
         placeholder="Enter your password"
         value={formData.password}
         onChange={handleChange}
         required
      />
    {showPassword ? (
     <MdVisibilityOff className="eye-icon" onClick={() => setShowPassword(false)} />
     ) : (
    <MdVisibility className="eye-icon" onClick={() => setShowPassword(true)} />
     )}
   </div>
      <button type="submit" className="btn-primary">Login</button>
   </form>
      {message && (
        <p
          className="info-msg"
          style={{
            color: messageType === 'success' ? 'green' : 'red',
            marginTop: '10px',
            fontWeight: 'bold'
          }}
        >
          {message}
        </p>
      )}
      {showForgot && (
        <button className="btn-secondary" onClick={() => navigate(`/reset?email=${formData.email}`)}>
          Forgot Password?
        </button>
      )}

      <p style={{ marginTop: '20px', color: 'black' ,textAlign:'center'}}>
        Don't have an account?<Link to={'/'} className='sign-up'>SignUp</Link>
      </p>
    </div>
  );
}

export default LoginPage;
