import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';

// Components
import Hero from './components/components/hero';
import Features from './components/components/features';
import MockInterview from './components/pages/mock';
import Resources from './components/pages/resources';
import Ats_resume from './components/pages/ats_resume'; // Corrected import to match your file name

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Features />
          </>
        }
      />

      {/* Mock Interview Page */}
      <Route path="/mock-interview" element={<MockInterview />} />

      {/* Resources Page */}
      <Route path="/resources" element={<Resources />} />

      {/* ATS Resume Analysis Page */}
      <Route path="/ats_resume" element={<Ats_resume />} />
    </Routes>
  );
}

export default App;
