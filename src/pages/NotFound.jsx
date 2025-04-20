import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-text mb-6">Page Not Found</h2>
      <p className="text-textSecondary mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn">
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound; 