import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuoteBox from './components/QuoteBox';
import Timer from './components/Timer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-text">
        <Navbar />
        <main className="p-4 flex flex-col gap-6 items-center justify-center">
          <Timer />
          <QuoteBox />
        </main>
      </div>
    </Router>
  );
}

export default App;
