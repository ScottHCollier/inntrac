import { useLocation } from 'react-router-dom';

export default function ServerError() {
  const { state } = useLocation();

  return (
    <div>
      {state?.error ? (
        <>
          <p>{state.error.title}</p>
          <p>{state.error.detail || 'Internal Server Error'}</p>
        </>
      ) : (
        <p>Server error</p>
      )}
    </div>
  );
}
