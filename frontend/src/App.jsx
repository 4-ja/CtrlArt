import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NewsletterSignup from './components/NewsletterSignup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center items-center gap-8 mb-8">
            <a 
              href="https://vite.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <img 
                src={viteLogo} 
                className="h-16 w-16" 
                alt="Vite logo" 
              />
            </a>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 animate-spin"
              style={{ animationDuration: '20s' }}
            >
              <img 
                src={reactLogo} 
                className="h-16 w-16" 
                alt="React logo" 
              />
            </a>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-8">
            Vite + React
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-8">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              count is {count}
            </button>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Edit <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
            </p>
          </div>
          
          <NewsletterSignup />
          
          <p className="text-gray-600 dark:text-gray-400">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
