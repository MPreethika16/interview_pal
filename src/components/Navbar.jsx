import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900 z-50 h-15">
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .menu-animation {
            animation: slideDown 0.3s ease forwards;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 rounded-lg p-2">
              <span className="font-mono font-bold text-black">=)</span>
            </div>
            <span className="text-white font-mono">Interview pal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('documentation')}
              className="hover:text-white transition-colors duration-200"
            >
              Documentation
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 px-4 py-2 transition-colors duration-200">
              <span>Sign Up</span>
              <span className="ml-1">↗</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 menu-animation border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
              <div className="py-2">
                <button
                  onClick={() => scrollToSection('features')}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('documentation')}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Documentation
                </button>
                <button className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors duration-200">
                  <span className="flex items-center gap-2">
                    Sign Up
                    <span>↗</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;