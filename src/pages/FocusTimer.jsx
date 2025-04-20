import Timer from '../components/Timer';
import QuoteBox from '../components/QuoteBox';

export default function FocusTimer() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-8 p-6 overflow-x-hidden">
      <Timer />
      <div className="w-full max-w-2xl">
        <QuoteBox />
      </div>
    </div>
  );
}