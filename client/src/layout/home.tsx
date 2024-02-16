import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  });

  return <></>;
};

export default Home;
