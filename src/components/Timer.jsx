import { useState, useEffect, useRef } from 'react';

const Timer = () => {
  // Load settings from localStorage or use defaults
  const getSettings = () => {
    const savedSettings = localStorage.getItem('focusforge_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return { focusTime: 25, breakTime: 5 };
  };

  const settings = getSettings();
  const [timeLeft, setTimeLeft] = useState(settings.focusTime * 60); // focusTime in minutes converted to seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [cycles, setCycles] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      audioRef.current.play();
      handleCycleComplete();
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Effect to update timer when settings change
  useEffect(() => {
    const handleStorageChange = () => {
      const newSettings = getSettings();
      if (!isActive) {
        if (mode === 'focus') {
          setTimeLeft(newSettings.focusTime * 60);
        } else {
          setTimeLeft(cycles % 4 === 0 ? 15 * 60 : newSettings.breakTime * 60);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isActive, mode, cycles]);

  const handleCycleComplete = () => {
    const currentSettings = getSettings();
    if (mode === 'focus') {
      // Completed a focus session, switch to break
      setCycles(cycles + 1);
      setMode('break');
      setTimeLeft(cycles % 4 === 0 ? 15 * 60 : currentSettings.breakTime * 60); // Long break every 4 cycles
    } else {
      // Completed a break, switch to focus
      setMode('focus');
      setTimeLeft(currentSettings.focusTime * 60);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    const currentSettings = getSettings();
    setIsActive(false);
    if (mode === 'focus') {
      setTimeLeft(currentSettings.focusTime * 60);
    } else {
      setTimeLeft(cycles % 4 === 0 ? 15 * 60 : currentSettings.breakTime * 60);
    }
  };

  const skipSession = () => {
    setIsActive(false);
    handleCycleComplete();
  };

  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const currentSettings = getSettings();
    const totalTime = mode === 'focus' ? 
      currentSettings.focusTime * 60 : 
      (cycles % 4 === 0 ? 15 * 60 : currentSettings.breakTime * 60);
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="card mx-auto max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-accent">
        {mode === 'focus' ? 'Focus Time' : cycles % 4 === 0 ? 'Long Break' : 'Short Break'}
      </h2>
      
      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-secondary stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="45"
            fill="none"
          ></circle>
          
          {/* Progress circle */}
          <circle
            className={`${mode === 'focus' ? 'text-accent' : 'text-green-500'} stroke-current`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            transform="rotate(-90 50 50)"
          ></circle>
          
          {/* Timer text */}
          <text
            x="50"
            y="50"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-2xl font-bold fill-current text-text"
          >
            {formatTime()}
          </text>
          
          <text
            x="50"
            y="65"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xs fill-current text-textSecondary"
          >
            {mode === 'focus' ? 'Stay focused' : 'Take a break'}
          </text>
        </svg>
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={toggleTimer}
          className="btn"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded-md bg-secondary text-text font-medium hover:bg-opacity-80 transition-all duration-200"
        >
          Reset
        </button>
        
        <button
          onClick={skipSession}
          className="px-4 py-2 rounded-md bg-secondary text-text font-medium hover:bg-opacity-80 transition-all duration-200"
        >
          Skip
        </button>
      </div>
      
      <div className="text-center text-textSecondary">
        <p>Completed cycles: {cycles}</p>
        <p className="text-xs mt-1">Every 4 cycles you get a long break</p>
      </div>
      
      <audio ref={audioRef}>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Timer;
