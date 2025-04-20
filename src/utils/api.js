// Mock API for tasks
export async function getTasks() {
  return new Promise((resolve) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTimeout(() => resolve(tasks), 500);
  });
}

export async function saveTask(task) {
  return new Promise((resolve) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = [...tasks, task];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTimeout(() => resolve(task), 500);
  });
}

// Quotes API
export async function getRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return {
      content: 'Focus on being productive instead of busy.',
      author: 'Tim Ferriss',
    };
  }
}