import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { fetchMockQuote, localQuotes } from "../data/api";

const QuoteBox = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    setIsUsingFallback(false);
    
    try {
      // The fetchMockQuote function now handles fallback internally
      const newQuote = await fetchMockQuote();
      setQuote(newQuote);
      
      // Check if we're using a local quote by comparing with our local collection
      const isLocalQuote = localQuotes.some(
        q => q.text === newQuote.text && q.author === newQuote.author
      );
      setIsUsingFallback(isLocalQuote);
      
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      // This should never happen now, but just in case
      const randomIndex = Math.floor(Math.random() * localQuotes.length);
      setQuote(localQuotes[randomIndex]);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
    // Refresh quote every hour
    const interval = setInterval(getQuote, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card text-center p-6 dark:bg-light-secondary transition-colors duration-200">
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <>
          <p className="text-lg mb-4 italic text-text dark:text-light-text">
            "{quote?.text}"
          </p>
          <p className="text-right text-sm text-textSecondary dark:text-light-textSecondary">
            — {quote?.author}
          </p>
          
          <div className="flex items-center justify-center mt-4">
            <button 
              onClick={getQuote}
              className="flex items-center gap-2 text-accent hover:text-opacity-80 transition-colors duration-200 text-sm"
              aria-label="Get new quote"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Get new quote</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteBox;
