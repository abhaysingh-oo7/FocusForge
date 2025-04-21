import { useAppContext } from '../context/AppContext';
import ProductivityHeatmap from '../components/ProductivityHeatmap';

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
  
  // Calculate most productive day based on task completion timestamps
  const calculateMostProductiveDay = () => {
    const completedTasksWithDates = tasks.filter(task => task.completed && task.completedAt);
    
    if (completedTasksWithDates.length === 0) {
      return 'No data yet';
    }
    
    // Count tasks completed by day of week
    const dayCount = {
      'Sunday': 0, 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 
      'Thursday': 0, 'Friday': 0, 'Saturday': 0
    };
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    completedTasksWithDates.forEach(task => {
      try {
        const date = new Date(task.completedAt);
        const day = days[date.getDay()];
        dayCount[day]++;
      } catch (e) {
        // Skip invalid dates
      }
    });
    
    // Find the day with most completions
    let maxCount = 0;
    let mostProductiveDay = 'No data yet';
    
    for (const [day, count] of Object.entries(dayCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostProductiveDay = day;
      }
    }
    
    // If no completed tasks with valid dates, use current day
    if (mostProductiveDay === 'No data yet') {
      const today = new Date();
      mostProductiveDay = days[today.getDay()];
    }
    
    return mostProductiveDay;
  };
  
  const mostProductiveDay = calculateMostProductiveDay();
  
  // Generate dynamic insights based on tasks data
  const generateInsights = () => {
    const insights = {
      efficientTime: "No data available yet",
      focusRecommendation: "Try establishing a regular focus routine",
      taskManagementTip: "Start by completing high-priority tasks first"
    };
    
    // Determine most efficient time of day
    const completedTasksWithTime = tasks.filter(task => task.completed && task.completedAt);
    if (completedTasksWithTime.length > 0) {
      const timeCount = {
        morning: 0,   // 5am - 12pm
        afternoon: 0, // 12pm - 5pm
        evening: 0,   // 5pm - 9pm
        night: 0      // 9pm - 5am
      };
      
      completedTasksWithTime.forEach(task => {
        try {
          const date = new Date(task.completedAt);
          const hour = date.getHours();
          
          if (hour >= 5 && hour < 12) timeCount.morning++;
          else if (hour >= 12 && hour < 17) timeCount.afternoon++;
          else if (hour >= 17 && hour < 21) timeCount.evening++;
          else timeCount.night++;
        } catch (e) {
          // Skip invalid dates
        }
      });
      
      // Find most productive time
      const maxTime = Object.entries(timeCount).reduce((max, [time, count]) => 
        count > max.count ? {time, count} : max, {time: "", count: 0});
        
      if (maxTime.count > 0) {
        const timeRanges = {
          morning: "between 5am-12pm",
          afternoon: "between 12pm-5pm",
          evening: "between 5pm-9pm",
          night: "between 9pm-5am"
        };
        
        insights.efficientTime = `Based on your completion history, you're most productive ${timeRanges[maxTime.time]}.`;
      }
    }
    
    // Focus session recommendation
    const currentFocusSessions = 6; // Since this is simulated, provide appropriate recommendation
    if (completedTasks > 10) {
      const recommendedSessions = Math.min(Math.ceil(currentFocusSessions * 1.25), 10);
      insights.focusRecommendation = `Try increasing your focus sessions to ${recommendedSessions} per week for optimal productivity. Your current pace is ${currentFocusSessions} per week.`;
    }
    
    // Task management tip based on priority completion
    const highPriorityCompleted = tasks.filter(task => task.completed && task.priority === 'high').length;
    const lowPriorityCompleted = tasks.filter(task => task.completed && task.priority === 'low').length;
    const mediumPriorityCompleted = tasks.filter(task => task.completed && task.priority === 'medium').length;
    
    if (highPriorityCompleted + lowPriorityCompleted + mediumPriorityCompleted > 0) {
      if (lowPriorityCompleted > highPriorityCompleted) {
        insights.taskManagementTip = "You tend to complete low-priority tasks more often than high-priority ones. Consider tackling high-priority tasks during your most productive hours.";
      } else if (highPriorityCompleted > lowPriorityCompleted + mediumPriorityCompleted) {
        insights.taskManagementTip = "Great job focusing on high-priority tasks! Make sure you're also making progress on medium and low priority items to maintain balance.";
      } else if (mediumPriorityCompleted > highPriorityCompleted + lowPriorityCompleted) {
        insights.taskManagementTip = "You're completing many medium-priority tasks. Consider evaluating if any should be reclassified as high-priority to better focus your efforts.";
      }
    }
    
    return insights;
  };
  
  const insights = generateInsights();
  
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
          <div className="h-56">
            <ProductivityHeatmap tasks={tasks} />
          </div>
        </div>
        
        <div className="card bg-secondary dark:bg-light-secondary transition-colors duration-500">
          <h2 className="text-xl font-bold text-text dark:text-light-text mb-4">Task Completion Insights</h2>
          <div className="space-y-4">
            <div className="bg-primary dark:bg-white/5 p-3 rounded-md">
              <h3 className="text-lg font-medium text-accent mb-1">Most Efficient Time</h3>
              <p className="text-sm text-textSecondary dark:text-light-textSecondary">
                {insights.efficientTime}
              </p>
            </div>
            
            <div className="bg-primary dark:bg-white/5 p-3 rounded-md">
              <h3 className="text-lg font-medium text-accent mb-1">Focus Session Recommendation</h3>
              <p className="text-sm text-textSecondary dark:text-light-textSecondary">
                {insights.focusRecommendation}
              </p>
            </div>
            
            <div className="bg-primary dark:bg-white/5 p-3 rounded-md">
              <h3 className="text-lg font-medium text-accent mb-1">Task Management Tip</h3>
              <p className="text-sm text-textSecondary dark:text-light-textSecondary">
                {insights.taskManagementTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 