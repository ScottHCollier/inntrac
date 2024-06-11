import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <p className='mb-10'>
        Oops - we could not find what your are looking for!
      </p>
      <Button onClick={goBack}>Go back</Button>
    </div>
  );
};

export default NotFound;
