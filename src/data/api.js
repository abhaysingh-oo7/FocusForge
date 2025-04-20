import axios from 'axios';

// Helper to detect if text is likely English
// This is a simple check that looks for common non-English characters
const isLikelyEnglish = (text) => {
  // Check if text contains mostly Latin alphabet characters
  const nonEnglishChars = /[^\x00-\x7F]+/g;
  const nonEnglishRatio = (text.match(nonEnglishChars) || []).length / text.length;
  
  // Check for common English words (a basic heuristic)
  const commonEnglishWords = ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'for'];
  const words = text.toLowerCase().split(/\s+/);
  const hasCommonWords = commonEnglishWords.some(word => words.includes(word));
  
  return nonEnglishRatio < 0.1 && hasCommonWords;
};

// Various APIs we can try for quotes
const APIS = [
  {
    name: 'favqs',
    url: 'https://favqs.com/api/qotd',
    transform: (data) => ({
      text: data.quote.body,
      author: data.quote.author
    })
  },
  {
    name: 'quotable',
    url: 'https://api.quotable.io/random',
    params: { language: 'en' },  // Explicitly request English
    transform: (data) => ({
      text: data.content,
      author: data.author
    })
  },
  {
    name: 'stoic-quotes',
    url: 'https://stoic-quotes.com/api/quote',
    transform: (data) => ({
      text: data.text,
      author: data.author
    })
  },
  {
    name: 'type.fit',
    url: 'https://type.fit/api/quotes',
    transform: (data) => {
      // This API returns an array, so we pick one randomly
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      return {
        text: randomQuote.text,
        author: randomQuote.author || 'Unknown'
      };
    }
  },
  {
    name: 'jsonplaceholder',
    url: 'https://jsonplaceholder.typicode.com/comments',
    params: { _limit: 20 },
    transform: (data) => {
      // Pick a random comment
      const randomComment = data[Math.floor(Math.random() * data.length)];
      // Clean up the text by taking the first sentence and capitalizing it
      const text = randomComment.body.split('.')[0].trim() + '.';
      const cleanedText = text.charAt(0).toUpperCase() + text.slice(1);
      // Format the author name
      const author = randomComment.email.split('@')[0].replace(/[.]/g, ' ');
      return {
        text: cleanedText,
        author: author.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      };
    }
  }
];

// Our fixed local quotes as final fallback
const LOCAL_QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" }
];

/**
 * Fetch a quote from one of our APIs or fallback to local quotes
 */
export const fetchMockQuote = async () => {
  // Try APIs in sequence until one works
  for (const api of APIS) {
    try {
      const response = await axios.get(api.url, { 
        params: api.params,
        timeout: 3000 // 3 second timeout
      });
      
      if (response.data) {
        const quote = api.transform(response.data);
        
        // Verify the quote is in English
        if (isLikelyEnglish(quote.text)) {
          return quote;
        } else {
          console.log(`Skipping non-English quote from ${api.name}`);
          // Try next API if quote doesn't appear to be in English
          continue;
        }
      }
    } catch (error) {
      console.log(`API ${api.name} failed:`, error.message);
      // Continue to next API on failure
    }
  }
  
  // If all APIs fail, use a local quote
  const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
  return LOCAL_QUOTES[randomIndex];
};

// Export the local quotes for use as fallback in components
export const localQuotes = LOCAL_QUOTES;

export default { fetchMockQuote, localQuotes }; 