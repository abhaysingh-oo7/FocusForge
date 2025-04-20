import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import FocusTimer from './pages/FocusTimer';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-primary text-text dark:bg-light-primary dark:text-light-text transition-colors duration-200">
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
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;