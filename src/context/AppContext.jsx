import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('focusforge_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('focusforge_darkMode');
    // Check system preference if not previously set
    if (savedDarkMode === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
    }
    return JSON.parse(savedDarkMode);
  });
  
  // Theme transition state
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem('focusforge_tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Apply dark mode with transitions
  useEffect(() => {
    // Save darkMode state to localStorage
    localStorage.setItem('focusforge_darkMode', JSON.stringify(darkMode));
    
    // Apply/remove dark class with transition
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString(), completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        // If task is being marked as completed, add a timestamp
        if (!task.completed) {
          return { ...task, completed: true, completedAt: new Date().toISOString() };
        } else {
          // If task is being marked as incomplete, remove the completion timestamp
          const { completedAt, ...restTask } = task;
          return { ...restTask, completed: false };
        }
      }
      return task;
    }));
  };

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setDarkMode(!darkMode);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with the CSS transition duration
    }, 50); // Small delay to ensure animation starts
  };

  const value = {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompletion,
    darkMode,
    toggleDarkMode,
    isTransitioning
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 