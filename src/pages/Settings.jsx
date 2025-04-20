import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Save, CheckCircle } from 'lucide-react';

export default function Settings() {
  const { darkMode } = useAppContext();
  const [settings, setSettings] = useState({
    focusTime: 25, // Default value
    breakTime: 5,  // Default value
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('focusforge_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to localStorage since AppContext doesn't have settings state
    localStorage.setItem('focusforge_settings', JSON.stringify(settings));
    // Show success message
    setShowSuccess(true);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-text dark:text-light-text transition-colors duration-500">Settings</h1>

      {showSuccess && (
        <div className="mb-4 flex items-center rounded-md bg-green-500/20 p-3 text-green-500 dark:text-green-400 transition-colors duration-500">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-textSecondary dark:text-light-textSecondary transition-colors duration-500">
            Focus Time (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={settings.focusTime}
            onChange={(e) =>
              setSettings({ ...settings, focusTime: parseInt(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-secondary bg-secondary dark:bg-light-secondary text-text dark:text-light-text shadow-sm focus:border-accent focus:ring-accent transition-colors duration-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-textSecondary dark:text-light-textSecondary transition-colors duration-500">
            Break Time (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={settings.breakTime}
            onChange={(e) =>
              setSettings({ ...settings, breakTime: parseInt(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-secondary bg-secondary dark:bg-light-secondary text-text dark:text-light-text shadow-sm focus:border-accent focus:ring-accent transition-colors duration-500"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center space-x-2 rounded-md bg-accent px-4 py-2 text-white hover:bg-opacity-90 transition-colors duration-500"
        >
          <Save className="h-5 w-5" />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  );
}