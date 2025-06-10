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
      <h2 style={{color:'blue'}}>User Management</h2>
      <h2 className="header">Search Users by Email</h2>

      <div className="sticky-search-wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="scrollable-table-wrapper">
        <table>
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
                    title="Edit"
                  />
                  <MdLockReset
                    onClick={() => navigate(`/reset?email=${u.email}`)}
                    className="reset-lock"
                    title="Reset Password"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchBar;
