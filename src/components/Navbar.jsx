import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-secondary shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-accent">
            FocusForge
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" 
              className={`${isActive('/') ? 'text-accent' : 'text-text hover:text-accent'} transition-colors duration-200`}>
              Home
            </Link>
            
            <Link to="/tasks" 
              className={`${isActive('/tasks') ? 'text-accent' : 'text-text hover:text-accent'} transition-colors duration-200`}>
              Tasks
            </Link>
            
            <Link to="/focus" 
              className={`${isActive('/focus') ? 'text-accent' : 'text-text hover:text-accent'} transition-colors duration-200`}>
              Focus Timer
            </Link>
            
            <Link to="/analytics" 
              className={`${isActive('/analytics') ? 'text-accent' : 'text-text hover:text-accent'} transition-colors duration-200`}>
              Analytics
            </Link>
            
            <Link to="/settings" 
              className={`${isActive('/settings') ? 'text-accent' : 'text-text hover:text-accent'} transition-colors duration-200`}>
              Settings
            </Link>
            
            <button 
              onClick={toggleDarkMode} 
              className="ml-2 p-2 rounded-full bg-primary hover:bg-opacity-80 transition-colors duration-200"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
