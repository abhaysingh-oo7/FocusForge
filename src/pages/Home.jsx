import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Timer from '../components/Timer';
import QuoteBox from '../components/QuoteBox';

const Home = () => {
  const { tasks } = useAppContext();
  
  // Get incomplete tasks count
  const incompleteTasks = tasks.filter(task => !task.completed).length;
  
  // Get today's date in a nice format
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="container-custom py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-text mb-2">
          Welcome to FocusForge
        </h1>
        <p className="text-textSecondary">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-2xl font-bold text-text mb-4">Your Focus Dashboard</h2>
            <p className="text-textSecondary mb-6">
              FocusForge helps you maximize productivity through focused work sessions,
              effective task management, and mindful breaks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-primary rounded-lg p-4">
                <h3 className="text-lg font-medium text-accent mb-2">Task Status</h3>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Pending tasks</span>
                  <span className="text-text font-medium">{incompleteTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Completed tasks</span>
                  <span className="text-text font-medium">{tasks.length - incompleteTasks}</span>
                </div>
                <div className="mt-4">
                  <Link to="/tasks" className="btn block w-full text-center">
                    Manage Tasks
                  </Link>
                </div>
              </div>
              
              <div className="bg-primary rounded-lg p-4">
                <h3 className="text-lg font-medium text-accent mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/tasks" className="block p-2 bg-secondary hover:bg-opacity-80 rounded-md transition-colors duration-200">
                    Create new task
                  </Link>
                  <Link to="/analytics" className="block p-2 bg-secondary hover:bg-opacity-80 rounded-md transition-colors duration-200">
                    View analytics
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <QuoteBox />
        </div>
        
        <div>
          <Timer />
        </div>
      </div>
    </div>
  );
};

export default Home; 