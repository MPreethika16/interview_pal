import React from 'react';
import { Github } from 'lucide-react';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-mono font-bold mb-6">
          Log in to your account
        </h1>

        <div className="space-y-6">
          {/* Social Login Section */}
          <div>
            <p className="text-sm text-slate-600 mb-3">Log in with</p>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <img 
                  src="/api/placeholder/24/24" 
                  alt="Discord" 
                  className="w-6 h-6"
                />
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <img 
                  src="/api/placeholder/24/24" 
                  alt="Google" 
                  className="w-6 h-6"
                />
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <Github className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-slate-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-mono text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-medium py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Log in
            </button>
          </form>

          {/* Footer Links */}
          <div className="space-y-2 text-sm">
            <p className="text-slate-600">
              Don't have an account yet?{' '}
              <a href="/signup" className="text-slate-800 underline hover:text-slate-900">
                go to signup
              </a>
              .
            </p>
            <p className="text-slate-600">
              Forgot your password?{' '}
              <a href="/reset" className="text-slate-800 underline hover:text-slate-900">
                reset it
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;