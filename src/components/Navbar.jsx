import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Menu, X, Home, CheckSquare, Clock, BarChart2, Settings as SettingsIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isTransitioning } = useAppContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`bg-secondary dark:bg-light-secondary transition-colors duration-500 ${isTransitioning ? 'duration-700' : ''} sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90`}>
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-accent transition-colors hover:text-accent/80">
            FocusForge
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-primary dark:bg-light-primary/10 hover:bg-primary/80 dark:hover:bg-light-primary/20 transition-colors" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-text dark:text-light-text" />
            ) : (
              <Menu className="h-5 w-5 text-text dark:text-light-text" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={isActive('/')} icon={<Home size={18} />} label="Home" />
            <NavLink to="/tasks" isActive={isActive('/tasks')} icon={<CheckSquare size={18} />} label="Tasks" />
            <NavLink to="/focus" isActive={isActive('/focus')} icon={<Clock size={18} />} label="Focus Timer" />
            <NavLink to="/analytics" isActive={isActive('/analytics')} icon={<BarChart2 size={18} />} label="Analytics" />
            <NavLink to="/settings" isActive={isActive('/settings')} icon={<SettingsIcon size={18} />} label="Settings" />
            
            <div className="ml-2 pl-2 border-l border-primary/20 dark:border-light-primary/20">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-gray-700/20 dark:border-gray-200/20 animate-fadeIn">
            <div className="flex flex-col space-y-1 pb-2">
              <MobileNavLink 
                to="/"
                isActive={isActive('/')}
                icon={<Home size={18} />}
                label="Home"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <MobileNavLink 
                to="/tasks"
                isActive={isActive('/tasks')}
                icon={<CheckSquare size={18} />}
                label="Tasks"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <MobileNavLink 
                to="/focus"
                isActive={isActive('/focus')}
                icon={<Clock size={18} />}
                label="Focus Timer"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <MobileNavLink 
                to="/analytics"
                isActive={isActive('/analytics')}
                icon={<BarChart2 size={18} />}
                label="Analytics"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <MobileNavLink 
                to="/settings"
                isActive={isActive('/settings')}
                icon={<SettingsIcon size={18} />}
                label="Settings"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <div className="flex items-center px-3 py-2 justify-between border-t border-gray-700/10 dark:border-gray-200/10 mt-2 pt-2">
                <span className="text-text/60 dark:text-light-text/60 text-sm">Toggle theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop navigation link component
const NavLink = ({ to, isActive, icon, label }) => (
  <Link 
    to={to}
    className={`flex items-center min-w-[140px] justify-center px-3 py-2 rounded-lg ${
      isActive 
        ? 'bg-accent text-white shadow-sm' 
        : 'text-text dark:text-light-text hover:bg-primary/50 dark:hover:bg-light-primary/10'
    } transition-all duration-300 ease-in-out`}
  >
    <span className={`w-5 flex justify-center transition-all duration-300 ease-in-out ${isActive ? 'text-white scale-110' : 'text-accent scale-100'}`}>{icon}</span>
    <span className={`ml-1 font-bold-transition ${isActive ? 'active' : ''}`}>{label}</span>
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, isActive, icon, label, onClick }) => (
  <Link 
    to={to}
    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
      isActive
        ? 'bg-accent text-white' 
        : 'text-text dark:text-light-text hover:bg-primary/50 dark:hover:bg-light-primary/10'
    } transition-all duration-300 ease-in-out`}
    onClick={onClick}
  >
    <span className={`w-5 flex justify-center transition-all duration-300 ease-in-out ${isActive ? 'text-white scale-110' : 'text-accent scale-100'}`}>{icon}</span>
    <span className={`font-bold-transition ${isActive ? 'active' : ''}`}>{label}</span>
  </Link>
);

export default Navbar;
