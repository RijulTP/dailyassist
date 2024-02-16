// Import necessary modules
"use client"
import React from "react"
import { useEffect, useState } from "react"

// Define the component
const MotivationalQuote = () => {
  // List of motivational quotes with author

  const motivationalQuotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote:
        "Hardships often prepare ordinary people for an extraordinary destiny.",
      author: "C.S. Lewis",
    },
    {
      quote:
        "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      quote:
        "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
    },
    {
      quote: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "It always seems impossible until it's done.",
      author: "Nelson Mandela",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote:
        "The only way to achieve the impossible is to believe it is possible.",
      author: "Charles Kingsleigh (Alice in Wonderland)",
    },
    {
      quote:
        "Success is not the key to happiness. Happiness is the key to success.",
      author: "Albert Schweitzer",
    },
    // Add more quotes here...
  ]
  const [quote, setQuote] = useState({ quote: "", author: "" })

  // Function to get a random quote from the list
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    return motivationalQuotes[randomIndex]
  }

  useEffect(() => {
    // Fetch the random quote when the component mounts
    const quoteData = getRandomQuote()
    setQuote(quoteData)
  }, []) // Empty dependency array ensures the effect runs only once

  // Render the quote component
  return (
    <div className="my-8 flex flex-col items-center">
      <blockquote className="italic text-lg text-black-600 bg-purple-100 rounded-lg p-4 shadow-md">
        "{quote.quote}"
      </blockquote>
      <p className="text-md font-bold text-white mt-2">- {quote.author}</p>
    </div>
  )
}

// Export the component
export default MotivationalQuote
