import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/global.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const handleReset = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      setMessage('User not found!');
      setMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match!');
      setMessageType('error');
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Password updated successfully!');
    setMessageType('success');

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className='container'>
      <h2 className='header'>Reset Password</h2>
      <form onSubmit={handleReset} className='form'>
        <label className='text'>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label className='text'>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Update Password</button>
      </form>

      {message && (
        <p
          style={{
            marginTop: '10px',
            color: messageType === 'success' ? 'green' : 'red',
            fontWeight: 'bold'
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ResetPassword;
