import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './index.css'; // Import the CSS file

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://todoappbackend-kq17.onrender.com/users/${id}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchUser();
  }, [id]);

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  const { user } = userData;

  if (!user) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="container">
      <h1 className="username">{user.username}</h1>
      <p className="email">{user.email}</p>
    </div>
  );
};

export default UserProfile;






