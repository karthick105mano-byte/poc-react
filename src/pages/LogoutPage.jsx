import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
      {/* your nav links here */}
    </nav>
  );
}
