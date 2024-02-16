import { Outlet } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <div>Landing</div>
      <Outlet />
    </div>
  );
}

export default Landing;
