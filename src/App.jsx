import React,{ useState } from 'react'
import "./index.css"; // Ensure Tailwind is applied globally

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <h1 className="text-4xl font-bold text-white">Tailwind is Working!</h1>
    </div>
  );
}

export default App
