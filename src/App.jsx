import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import FocusTimer from './pages/FocusTimer';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

// Add smooth theme transitions with this component
const ThemeTransition = ({ children }) => {
  const { isTransitioning, darkMode } = useAppContext();
  
  return (
    <div className={`min-h-screen bg-primary text-text dark:bg-light-primary dark:text-light-text 
      transition-colors duration-500 ${isTransitioning ? 'duration-700' : ''}`}>
      {children}
    </div>
  );
};

// Main App with AppProvider
function AppWithProvider() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

// Main App component using context
function App() {
  return (
    <Router>
      <ThemeTransition>
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/focus" element={<FocusTimer />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </ThemeTransition>
    </Router>
  );
}

export default AppWithProvider;