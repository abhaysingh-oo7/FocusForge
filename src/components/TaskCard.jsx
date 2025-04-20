import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const TaskCard = ({ task }) => {
  const { deleteTask, toggleTaskCompletion, updateTask } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const priorityClasses = {
    low: "bg-green-500 bg-opacity-20 text-green-400",
    medium: "bg-yellow-500 bg-opacity-20 text-yellow-400",
    high: "bg-red-500 bg-opacity-20 text-red-400"
  };

  return (
    <div className={`card mb-4 border-l-4 ${task.completed ? 'border-green-500 opacity-75' : `border-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-500`}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-textSecondary mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              required
              className="w-full bg-primary border border-secondary rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-textSecondary mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              rows="2"
              className="w-full bg-primary border border-secondary rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-textSecondary mb-1">Priority</label>
            <select
              id="priority"
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              className="w-full bg-primary border border-secondary rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-secondary hover:bg-opacity-80 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-accent hover:bg-opacity-90 rounded-md transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="w-5 h-5 rounded-md border-secondary text-accent focus:ring-accent"
              />
              <h3 className={`ml-3 text-lg font-medium ${task.completed ? 'line-through text-textSecondary' : 'text-text'}`}>
                {task.title}
              </h3>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityClasses[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          
          <p className={`ml-8 text-sm ${task.completed ? 'text-textSecondary line-through' : 'text-text'}`}>
            {task.description}
          </p>
          
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
