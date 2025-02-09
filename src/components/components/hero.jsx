import React from 'react';
import { Moon } from 'lucide-react';
import Features from './features';
import Navbar from './Navbar';


const Hero = () => {
  return (
    <div className="scroll-smooth">
      <div id="home" className="bg-slate-900 min-h-screen flex flex-col">
        {/* Navigation */}
         <Navbar/>

        {/* Hero Content - Now centered vertically */}
        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-mono text-white mb-6">
             Interview pal: <span className="italic">Your personal</span> AI buddy
             <br/>
              
              for Job prep
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            An AI-powered, feature-rich interview companion that helps you with mock interviews, resume reviews, job insights, and more.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 w-full md:w-auto">
                Get Started →
              </button>
            </div>
          </div>
        </main>
      </div>
      <Features/>
    </div>
  );
};

export default Hero;