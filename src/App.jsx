import React,{ useState } from 'react'
import "./index.css"; // Ensure Tailwind is applied globally
import Hero from './components/hero'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Hero/>
    </>
  );
}

export default App
