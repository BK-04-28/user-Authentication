import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'; 
import { FaPenToSquare } from 'react-icons/fa6';
import { MdLockReset } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users')) || [];
    const reversed = stored.slice().reverse(); 
    setUsers(reversed);
    setFiltered(reversed);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const results = users.filter(user =>
      user.email.toLowerCase().includes(term)
    );
    setFiltered(results);
  };

  return (
    <div className="Lists">
      <h2 className="header">Search Users by Email</h2>
<div style={{ position: 'relative' }}>
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={handleSearch}
    style={{
      width: '80%',
      padding: '10px 40px 10px 10px',
      borderRadius: '8px',
      border: '1px solid rgb(214, 217, 222)',
      fontSize: '16px',
      outline: 'none',
      marginBottom:'10px'
    }}
  />
  <FaSearch
    style={{
      position: 'absolute',
      right: '28px',
      top: '40%',
      transform: 'translateY(-50%)',
      color: 'white',
      padding:'11px',
      borderRadius:'5px',
      fontSize: '18px',
      pointerEvents: 'none',
      backgroundColor:'blue',
      cursor:'pointer'
    }}
       />
      </div>

      <table style={{ color: '#1F2937', width: '100%' }} border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, i) => (
            <tr key={i}>
              <td>{u.fname} {u.lname}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <FaPenToSquare
                 onClick={() => navigate('/edit-user', { state: u })}
                 style={{ cursor: 'pointer', fontSize: '20px', color: '#2563EB' }}
                 title='Edit'
                />
                  <MdLockReset 
                  onClick={() => navigate(`/reset?email=${u.email}`)}
                  className='reset-lock'
                  title='Reset Password'
                   />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchBar;
