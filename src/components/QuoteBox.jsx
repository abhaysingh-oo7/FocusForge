import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteBox = () => {
  const [quote, setQuote] = useState({
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  });
  const [loading, setLoading] = useState(false);

  const defaultQuotes = [
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey" },
    { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
  ];

  const fetchQuote = async () => {
    // console.log(' it is working and it will work')
    setLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random?tags=productivity');
      if (response.data) {
        setQuote({
          text: response.data.content,
          author: response.data.author
        });
      }
      else {
        // If API fails, use a random quote from default list
        const randomIndex = Math.floor(Math.random() * defaultQuotes.length);
        setQuote(defaultQuotes[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      // If API fails, use a random quote from default list
      const randomIndex = Math.floor(Math.random() * defaultQuotes.length);
      setQuote(defaultQuotes[randomIndex]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    // Refresh quote every hour
    const interval = setInterval(fetchQuote, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card text-center p-6">
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <>
          <p className="text-lg mb-4 italic text-text">"{quote.text}"</p>
          <p className="text-right text-sm text-textSecondary">— {quote.author}</p>
          <button 
            onClick={fetchQuote}
            className="mt-4 text-accent hover:text-opacity-80 transition-colors duration-200 text-sm"
          >
            Get new quote
          </button>
        </>
      )}
    </div>
  );
};

export default QuoteBox;
