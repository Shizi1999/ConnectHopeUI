import { Navigate } from 'react-router-dom';
import path from '~/constant/path';
function NotFound() {
  return (
    <div>
      <Navigate to={path.home} />
    </div>
  );
}

export default NotFound;
