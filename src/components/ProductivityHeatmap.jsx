import { useState, useEffect } from 'react';
import { addDays, startOfMonth, endOfMonth, format, isSameMonth, isSameDay, subMonths, addMonths, getDay } from 'date-fns';

const ProductivityHeatmap = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});
  const [monthData, setMonthData] = useState([]);
  
  // Process tasks to count completions by date
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed && task.completedAt);
    const taskCounts = {};
    
    completedTasks.forEach(task => {
      try {
        const dateStr = task.completedAt.split('T')[0]; // Get YYYY-MM-DD part
        taskCounts[dateStr] = (taskCounts[dateStr] || 0) + 1;
      } catch (e) {
        // Skip invalid dates
      }
    });
    
    setTasksByDate(taskCounts);
  }, [tasks]);
  
  // Create calendar data for the current month
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = monthStart;
    const endDate = monthEnd;
    
    // Calculate starting day of week offset (0 = Sunday, 1 = Monday, etc.)
    const startDay = getDay(startDate);
    
    // Create array of date cells including leading/trailing empty cells
    const dateCells = [];
    
    // Add leading empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      dateCells.push({ date: null, isEmpty: true });
    }
    
    // Add cells for each day of the month
    let currentDateIter = startDate;
    while (currentDateIter <= endDate) {
      const dateStr = format(currentDateIter, 'yyyy-MM-dd');
      const taskCount = tasksByDate[dateStr] || 0;
      
      dateCells.push({
        date: new Date(currentDateIter),
        dayOfMonth: format(currentDateIter, 'd'),
        taskCount,
        intensity: getColorIntensity(taskCount),
        isToday: isSameDay(currentDateIter, new Date())
      });
      
      currentDateIter = addDays(currentDateIter, 1);
    }
    
    // Add trailing empty cells to complete the last row
    const remainingCells = (7 - (dateCells.length % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      dateCells.push({ date: null, isEmpty: true });
    }
    
    setMonthData(dateCells);
  }, [currentDate, tasksByDate]);
  
  // Helper to determine color intensity based on task count
  const getColorIntensity = (count) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    if (count === 4) return 4;
    return 5; // 5+ tasks
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Navigate to current month
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Get day cells grouped by weeks
  const weeks = [];
  for (let i = 0; i < monthData.length; i += 7) {
    weeks.push(monthData.slice(i, i + 7));
  }
  
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={prevMonth}
          className="p-1 rounded-md hover:bg-primary dark:hover:bg-white/10 transition-colors"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <div className="text-base font-medium">
          {format(currentDate, 'MMMM yyyy')}
        </div>
        
        <button 
          onClick={nextMonth}
          className="p-1 rounded-md hover:bg-primary dark:hover:bg-white/10 transition-colors"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      <div className="w-full flex-grow overflow-x-auto">
        <div className="min-w-full">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0.5 mb-0.5 text-center text-[10px] text-textSecondary dark:text-light-textSecondary">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          
          {/* Calendar grid */}
          <div className="grid gap-0.5">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-0.5">
                {week.map((day, dayIndex) => (
                  <div 
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={`
                      aspect-square rounded-sm flex items-center justify-center 
                      ${day.isEmpty ? 'bg-transparent' : 'bg-transparent'}
                      ${day.isToday ? 'ring-1 ring-accent' : ''}
                    `}
                  >
                    {!day.isEmpty && (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <span className={`text-[11px] ${day.intensity === 0 ? 'text-textSecondary dark:text-light-textSecondary' : 'text-text dark:text-light-text font-medium'}`}>
                          {day.dayOfMonth}
                        </span>
                        {day.taskCount > 0 && (
                          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${getTaskCountColor(day.intensity)}`}>
                            <span className="text-[9px] font-bold text-white dark:text-white">
                              {day.taskCount}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <button 
          onClick={goToToday}
          className="text-[10px] text-accent hover:underline"
        >
          Today
        </button>
        
        <div className="flex items-center gap-0.5 text-[8px] text-textSecondary dark:text-light-textSecondary">
          <span>Tasks:</span>
          <div className="flex items-center gap-0.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500 flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">1</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-green-600 dark:bg-green-700 flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">3</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-green-800 dark:bg-green-900 flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">5+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get task count background color
const getTaskCountColor = (intensity) => {
  switch (intensity) {
    case 1:
      return 'bg-green-400 dark:bg-green-500';
    case 2:
      return 'bg-green-500 dark:bg-green-600';
    case 3:
      return 'bg-green-600 dark:bg-green-700';
    case 4:
      return 'bg-green-700 dark:bg-green-800';
    case 5:
      return 'bg-green-800 dark:bg-green-900';
    default:
      return 'bg-green-400 dark:bg-green-500';
  }
};

export default ProductivityHeatmap; 