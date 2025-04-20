import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-secondary shadow-md dark:bg-light-secondary transition-colors duration-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-accent">
            FocusForge
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-text dark:text-light-text" />
            ) : (
              <Menu className="h-6 w-6 text-text dark:text-light-text" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" 
              className={`${isActive('/') ? 'text-accent' : 'text-text dark:text-light-text hover:text-accent dark:hover:text-accent'} transition-colors duration-200`}>
              Home
            </Link>
            
            <Link to="/tasks" 
              className={`${isActive('/tasks') ? 'text-accent' : 'text-text dark:text-light-text hover:text-accent dark:hover:text-accent'} transition-colors duration-200`}>
              Tasks
            </Link>
            
            <Link to="/focus" 
              className={`${isActive('/focus') ? 'text-accent' : 'text-text dark:text-light-text hover:text-accent dark:hover:text-accent'} transition-colors duration-200`}>
              Focus Timer
            </Link>
            
            <Link to="/analytics" 
              className={`${isActive('/analytics') ? 'text-accent' : 'text-text dark:text-light-text hover:text-accent dark:hover:text-accent'} transition-colors duration-200`}>
              Analytics
            </Link>
            
            <Link to="/settings" 
              className={`${isActive('/settings') ? 'text-accent' : 'text-text dark:text-light-text hover:text-accent dark:hover:text-accent'} transition-colors duration-200`}>
              Settings
            </Link>
            
            <button 
              onClick={toggleDarkMode} 
              className="ml-2 p-2 rounded-full bg-primary hover:bg-opacity-80 transition-colors duration-200 dark:bg-light-primary"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-accent" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-gray-700 dark:border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link to="/" 
                className={`block px-3 py-2 rounded-md ${isActive('/') ? 'bg-primary text-accent' : 'text-text dark:text-light-text'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link to="/tasks" 
                className={`block px-3 py-2 rounded-md ${isActive('/tasks') ? 'bg-primary text-accent' : 'text-text dark:text-light-text'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tasks
              </Link>
              
              <Link to="/focus" 
                className={`block px-3 py-2 rounded-md ${isActive('/focus') ? 'bg-primary text-accent' : 'text-text dark:text-light-text'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Focus Timer
              </Link>
              
              <Link to="/analytics" 
                className={`block px-3 py-2 rounded-md ${isActive('/analytics') ? 'bg-primary text-accent' : 'text-text dark:text-light-text'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </Link>
              
              <Link to="/settings" 
                className={`block px-3 py-2 rounded-md ${isActive('/settings') ? 'bg-primary text-accent' : 'text-text dark:text-light-text'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              
              <div className="flex items-center px-3 py-2">
                <span className="text-text dark:text-light-text mr-3">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full bg-primary hover:bg-opacity-80 transition-colors duration-200 dark:bg-light-primary"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-accent" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
