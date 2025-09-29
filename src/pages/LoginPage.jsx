import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fakeJwtToken = () => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({ user: 'demoUser', exp: Math.floor(Date.now() / 1000) + 3600 })
  );
  const signature = 'signature';
  return `${header}.${payload}.${signature}`;
};

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', fakeJwtToken());
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', paddingTop: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label><br/>
        <label>
          Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
