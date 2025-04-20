import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-text mb-6">About FocusForge</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-accent mb-4">Our Mission</h2>
        <p className="text-textSecondary mb-4">
          FocusForge is designed to help you maximize your productivity through focused work sessions,
          effective task management, and mindful breaks. We believe that by combining the best productivity
          techniques with a seamless user experience, we can help you achieve more while maintaining balance.
        </p>
        <p className="text-textSecondary">
          Our application is built on research-backed methods like the Pomodoro Technique, helping you
          maintain high levels of focus and energy throughout your day.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text mb-2">Focus Timer</h3>
          <p className="text-textSecondary">
            Our Pomodoro-inspired timer helps you work in focused sprints with timed breaks, 
            maximizing productivity and preventing burnout.
          </p>
        </div>
        
        <div className="card">
          <div className="text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text mb-2">Task Management</h3>
          <p className="text-textSecondary">
            Organize, prioritize, and track your tasks with our intuitive task management system.
            Never lose track of what needs to be done.
          </p>
        </div>
        
        <div className="card">
          <div className="text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text mb-2">Analytics</h3>
          <p className="text-textSecondary">
            Gain insights into your productivity patterns with detailed analytics.
            Understand when and how you work best.
          </p>
        </div>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-accent mb-4">How It Works</h2>
        <ol className="space-y-4 text-textSecondary list-decimal pl-5">
          <li>
            <strong className="text-text">Create tasks</strong> - Add tasks to your list with titles, descriptions, and priority levels.
          </li>
          <li>
            <strong className="text-text">Start a focus session</strong> - Use the timer to work in 25-minute focused sprints with short breaks in between.
          </li>
          <li>
            <strong className="text-text">Track your progress</strong> - Mark tasks as complete and view your productivity analytics.
          </li>
          <li>
            <strong className="text-text">Stay motivated</strong> - Read inspirational productivity quotes and review your performance.
          </li>
        </ol>
      </div>
      
      <div className="card text-center py-8">
        <h2 className="text-xl font-bold text-accent mb-4">Ready to boost your productivity?</h2>
        <p className="text-textSecondary mb-6">
          Start using FocusForge today and take control of your time and tasks.
        </p>
        <Link to="/tasks" className="btn">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default About; 