import { useAppContext } from '../context/AppContext';
import QuoteBox from '../components/QuoteBox';
import TaskCard from '../components/TaskCard';
import { CheckCircle, Circle, Timer as TimerIcon } from 'lucide-react';

export default function Dashboard() {
  const { tasks } = useAppContext();
  const completedTasks = tasks.filter((task) => task.completed).length;

  // Get settings from localStorage
  const getSettings = () => {
    const savedSettings = localStorage.getItem('focusforge_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return { focusTime: 25, breakTime: 5 };
  };
  
  const settings = getSettings();

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-secondary p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">Tasks</h2>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-textSecondary">
                {completedTasks}/{tasks.length}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-secondary p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">Focus Time</h2>
            <TimerIcon className="h-5 w-5 text-accent" />
          </div>
          <p className="mt-2 text-2xl font-bold text-text">
            {settings.focusTime} minutes
          </p>
        </div>

        <div className="rounded-lg bg-secondary p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">Break Time</h2>
            <Circle className="h-5 w-5 text-accent" />
          </div>
          <p className="mt-2 text-2xl font-bold text-text">
            {settings.breakTime} minutes
          </p>
        </div>
      </div>

      <QuoteBox />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text">Recent Tasks</h2>
        {tasks.slice(0, 3).map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}