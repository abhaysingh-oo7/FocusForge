import { useAppContext } from '../context/AppContext';

const Analytics = () => {
  const { tasks } = useAppContext();
  
  // Calculate statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Count tasks by priority
  const tasksByPriority = {
    low: tasks.filter(task => task.priority === 'low').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    high: tasks.filter(task => task.priority === 'high').length
  };
  
  // Calculate most productive day (simulated)
  const mostProductiveDay = 'Wednesday';
  
  // Simulate focus sessions data
  const focusSessions = {
    total: 12,
    weeklyAverage: 6,
    longestStreak: 4
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-text dark:text-light-text mb-8 transition-colors duration-500">Performance Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h3 className="text-lg font-medium text-textSecondary dark:text-light-textSecondary mb-2">Completion Rate</h3>
          <div className="flex items-end">
            <span className="text-4xl font-bold text-accent">{completionRate}%</span>
            <span className="text-sm text-textSecondary dark:text-light-textSecondary ml-2 mb-1">of tasks</span>
          </div>
          <p className="text-xs text-textSecondary dark:text-light-textSecondary mt-2">{completedTasks} of {totalTasks} tasks completed</p>
        </div>
        
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h3 className="text-lg font-medium text-textSecondary dark:text-light-textSecondary mb-2">Tasks by Priority</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-400">Low</span>
              <div className="w-2/3 bg-primary dark:bg-white/10 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(tasksByPriority.low / totalTasks) * 100 || 0}%` }}></div>
              </div>
              <span className="text-sm text-textSecondary dark:text-light-textSecondary">{tasksByPriority.low}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-400">Medium</span>
              <div className="w-2/3 bg-primary dark:bg-white/10 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(tasksByPriority.medium / totalTasks) * 100 || 0}%` }}></div>
              </div>
              <span className="text-sm text-textSecondary dark:text-light-textSecondary">{tasksByPriority.medium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-400">High</span>
              <div className="w-2/3 bg-primary dark:bg-white/10 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(tasksByPriority.high / totalTasks) * 100 || 0}%` }}></div>
              </div>
              <span className="text-sm text-textSecondary dark:text-light-textSecondary">{tasksByPriority.high}</span>
            </div>
          </div>
        </div>
        
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h3 className="text-lg font-medium text-textSecondary dark:text-light-textSecondary mb-2">Most Productive Day</h3>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-accent">{mostProductiveDay}</span>
          </div>
          <p className="text-xs text-textSecondary dark:text-light-textSecondary mt-2">Based on your task completion history</p>
        </div>
        
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h3 className="text-lg font-medium text-textSecondary dark:text-light-textSecondary mb-2">Focus Sessions</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-textSecondary dark:text-light-textSecondary">Total</span>
              <span className="text-sm font-medium text-text dark:text-light-text">{focusSessions.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-textSecondary dark:text-light-textSecondary">Weekly Avg</span>
              <span className="text-sm font-medium text-text dark:text-light-text">{focusSessions.weeklyAverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-textSecondary dark:text-light-textSecondary">Longest Streak</span>
              <span className="text-sm font-medium text-text dark:text-light-text">{focusSessions.longestStreak}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h2 className="text-xl font-bold text-text dark:text-light-text mb-4">Productivity Over Time</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-textSecondary dark:text-light-textSecondary text-center">
              This is a placeholder for a chart showing your productivity trends over time.
              <br />
              <span className="text-sm">In a real app, this would be a line or bar chart showing tasks completed per day/week.</span>
            </p>
          </div>
        </div>
        
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h2 className="text-xl font-bold text-text dark:text-light-text mb-4">Task Completion Insights</h2>
          <div className="space-y-4">
            <div className="bg-primary dark:bg-white/5 p-3 rounded-md">
              <h3 className="text-lg font-medium text-accent mb-1">Most Efficient Time</h3>
              <p className="text-sm text-textSecondary dark:text-light-textSecondary">
                Based on your completion history, you're most productive in the morning.
                Try scheduling important tasks between 9am-11am.
              </p>
            </div>
            
            <div className="bg-primary dark:bg-white/5 p-3 rounded-md">
              <h3 className="text-lg font-medium text-accent mb-1">Focus Session Recommendation</h3>
              <p className="text-sm text-textSecondary dark:text-light-textSecondary">
                Try increasing your focus sessions to 8 per week for optimal productivity.
                Your current pace is 6 per week.
              </p>
            </div>
            
            <div className="bg-primary dark:bg-white/5 p-3 rounded-md">
              <h3 className="text-lg font-medium text-accent mb-1">Task Management Tip</h3>
              <p className="text-sm text-textSecondary dark:text-light-textSecondary">
                You tend to complete low-priority tasks more often than high-priority ones.
                Consider tackling high-priority tasks during your most productive hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 