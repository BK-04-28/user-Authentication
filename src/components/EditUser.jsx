import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/global.css';

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  const [editData, setEditData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (userData) {
      setEditData({
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        phone: userData.phone
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u =>
      u.email === editData.email ? { ...u, ...editData } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(' User updated successfully!');
    navigate('/home');
  };

  return (
    <div className="container">
      <h2 className="header">Edit User</h2>
      <div className="edit-form">
        <label>First Name:</label>
        <input name="fname" value={editData.fname} onChange={handleChange} />

        <label>Last Name:</label>
        <input name="lname" value={editData.lname} onChange={handleChange} />

        <label>Email:</label>
        <input name="email" value={editData.email} onChange={handleChange} readOnly style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }} />

        <label>Phone:</label>
        <input name="phone" value={editData.phone} onChange={handleChange} />
       <div className="save-cancel">
        <button
        onClick={() => navigate('/home')}
        style={{
          backgroundColor: '#9CA3AF',  
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
       >
         Cancel
       </button>

     <button
          onClick={handleSave}
          style={{
           background: "linear-gradient(90deg, #8e2de2, #4a00e0)",
           color: 'white',
           padding: '10px 20px',
           cursor: 'pointer',
           fontWeight: 'bold',
           fontSize: '16px',
           }}
          >
            Save
        </button>

       </div>
      </div>
    </div>
  );
}

export default EditUser;
