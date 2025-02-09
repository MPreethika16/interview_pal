import React from 'react';
import { Moon } from 'lucide-react';
import Features from './features';


const Hero = () => {
  return (
    <div>
    <div className="bg-slate-900 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 rounded-lg p-2">
            <span className="font-mono font-bold text-black">=)</span>
          </div>
          <span className="text-white font-mono">Interview pal</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#documentation" className="hover:text-white">Documentation</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 px-4 py-2">
            <span className="hidden md:inline">Sign Up</span>
            <span className="inline md:hidden">Demo</span>
            <span className="ml-1">↗</span>
          </button>
        </div>
      </nav>

      {/* Hero Content - Now centered vertically */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-mono text-white mb-6">
           Interview pal :<span className="italic">Your personal</span> AI buddy
           <br/>
            
            for Job prep
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          An open-source, feature-rich, full-stack React + NodeJS template that manages features for you.
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