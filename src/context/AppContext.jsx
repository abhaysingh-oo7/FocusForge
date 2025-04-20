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
    return savedDarkMode ? JSON.parse(savedDarkMode) : true;
  });

  useEffect(() => {
    localStorage.setItem('focusforge_tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('focusforge_darkMode', JSON.stringify(darkMode));
    // Apply dark mode to the document element
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
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const value = {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompletion,
    darkMode,
    toggleDarkMode
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 