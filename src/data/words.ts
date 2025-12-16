export const commonWords: string[] = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "great", "world", "very", "through", "where", "much", "should", "system", "each", "made",
  "hand", "high", "such", "here", "keep", "large", "general", "turn", "place", "move",
  "live", "every", "another", "around", "found", "point", "still", "young", "house", "old",
  "part", "thing", "right", "before", "last", "never", "change", "same", "need", "small",
  "while", "off", "line", "show", "learn", "play", "build", "between", "must", "few",
  "program", "water", "long", "under", "city", "many", "read", "state", "write", "call",
  "always", "home", "might", "start", "open", "both", "help", "school", "next", "kind",
  "thought", "head", "country", "group", "children", "week", "night", "being", "money", "area",
  "side", "life", "family", "during", "number", "public", "often", "against", "story", "away",
  "problem", "fact", "example", "run", "become", "early", "enough", "level", "face", "study"
];

export const programmingWords: string[] = [
  "function", "variable", "const", "let", "return", "import", "export", "class", "interface", "type",
  "async", "await", "promise", "callback", "array", "object", "string", "number", "boolean", "null",
  "undefined", "map", "filter", "reduce", "forEach", "push", "pop", "shift", "slice", "splice",
  "component", "props", "state", "effect", "hook", "render", "virtual", "dom", "event", "handler",
  "module", "package", "npm", "yarn", "node", "express", "react", "next", "typescript", "javascript",
  "api", "rest", "fetch", "axios", "json", "parse", "stringify", "http", "https", "request",
  "response", "error", "try", "catch", "finally", "throw", "debug", "console", "log", "test",
  "build", "deploy", "server", "client", "database", "query", "schema", "model", "route", "controller"
];

export const quotes: string[] = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only impossible journey is the one you never begin.",
  "Believe you can and you are halfway there.",
  "The best time to plant a tree was twenty years ago. The second best time is now.",
  "Your time is limited, do not waste it living someone else life.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "The way to get started is to quit talking and begin doing.",
  "If life were predictable it would cease to be life and be without flavor.",
  "In the end, it is not the years in your life that count. It is the life in your years.",
  "Life is what happens when you are busy making other plans.",
  "The purpose of our lives is to be happy.",
  "You only live once, but if you do it right, once is enough.",
  "Many of life's failures are people who did not realize how close they were to success when they gave up.",
  "If you want to live a happy life, tie it to a goal, not to people or things.",
  "Never let the fear of striking out keep you from playing the game."
];

export type TextMode = 'words' | 'programming' | 'quotes';

export const generateText = (mode: TextMode, wordCount: number = 50): string => {
  let words: string[];

  switch (mode) {
    case 'programming':
      words = programmingWords;
      break;
    case 'quotes':
      return quotes[Math.floor(Math.random() * quotes.length)];
    case 'words':
    default:
      words = commonWords;
  }

  const result: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    result.push(words[randomIndex]);
  }

  return result.join(' ');
};
