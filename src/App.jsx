import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./index.css";
import Hero from './components/components/hero';
import MockInterview from './components/pages/mock';
import Features from './components/components/features';
import './App.css';
import Resources from './components/pages/resources';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <Features />
        </>
      } />
      <Route path="/mock-interview" element={<MockInterview />} />
      <Route path="/resources" element={<Resources/>}/>

    </Routes>
  );
}

export default App;
