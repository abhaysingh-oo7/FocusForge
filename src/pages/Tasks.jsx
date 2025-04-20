import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const { tasks, addTask } = useAppContext();
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium'
    });
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text dark:text-light-text transition-colors duration-500">Task Manager</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn text-white"
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm && (
        <div className="card bg-secondary dark:bg-light-secondary mb-8 transition-colors duration-500">
          <h2 className="text-xl font-bold mb-4 text-accent">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-textSecondary dark:text-light-textSecondary mb-1 transition-colors duration-500">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                required
                className="w-full bg-primary dark:bg-white/5 border border-secondary rounded-md px-3 py-2 text-text dark:text-light-text focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-500"
                placeholder="What needs to be done?"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-textSecondary dark:text-light-textSecondary mb-1 transition-colors duration-500">Description</label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleChange}
                rows="3"
                className="w-full bg-primary dark:bg-white/5 border border-secondary rounded-md px-3 py-2 text-text dark:text-light-text focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-500"
                placeholder="Add details about the task..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-textSecondary dark:text-light-textSecondary mb-1 transition-colors duration-500">Priority</label>
              <select
                id="priority"
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                className="w-full bg-primary dark:bg-white/5 border border-secondary rounded-md px-3 py-2 text-text dark:text-light-text focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn text-white">
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-md transition-colors duration-500 ${filter === 'all' ? 'bg-accent text-white' : 'bg-secondary text-text dark:bg-light-secondary dark:text-light-text'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={`px-4 py-2 rounded-md transition-colors duration-500 ${filter === 'active' ? 'bg-accent text-white' : 'bg-secondary text-text dark:bg-light-secondary dark:text-light-text'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`px-4 py-2 rounded-md transition-colors duration-500 ${filter === 'completed' ? 'bg-accent text-white' : 'bg-secondary text-text dark:bg-light-secondary dark:text-light-text'}`}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card bg-secondary dark:bg-light-secondary text-center py-8 transition-colors duration-500">
          <p className="text-textSecondary dark:text-light-textSecondary transition-colors duration-500">No tasks found</p>
          <button 
            onClick={() => setShowForm(true)} 
            className="mt-4 text-accent hover:text-opacity-80 transition-colors duration-200"
          >
            Create your first task
          </button>
        </div>
      ) : (
        <div>
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;