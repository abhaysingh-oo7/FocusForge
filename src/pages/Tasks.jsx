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
        <h1 className="text-3xl font-bold text-text">Task Manager</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn"
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4 text-accent">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-textSecondary mb-1">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                required
                className="w-full bg-primary border border-secondary rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="What needs to be done?"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-textSecondary mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleChange}
                rows="3"
                className="w-full bg-primary border border-secondary rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Add details about the task..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-textSecondary mb-1">Priority</label>
              <select
                id="priority"
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                className="w-full bg-primary border border-secondary rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn">
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-accent text-text' : 'bg-secondary text-text'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-accent text-text' : 'bg-secondary text-text'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-accent text-text' : 'bg-secondary text-text'}`}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-textSecondary">No tasks found</p>
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