import React from 'react';
import { Lock, BookOpen, FileText, ClipboardList } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, description, onClick, isClickable }) => (
  <div 
    className={`flex gap-6 max-w-xl ${isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
    onClick={onClick}
  >
    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className={`text-white font-mono text-lg mb-2 ${isClickable ? 'hover:text-yellow-400' : ''}`}>
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Features = () => {
  const navigate = useNavigate();

  const handleMockInterviewClick = () => {
    navigate('/mock-interview');
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col justify-center px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono mb-4">
            <span className="text-yellow-400">AI</span>
            <span className="text-white"> Feature-Driven</span>
          </h2>
          <div className="text-slate-400 font-mono">
            <p>Seamless Interview Preparation</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          <FeatureCard
            icon={<BookOpen className="text-yellow-400 w-6 h-6" />}
            title="Personalized Mock Interviews"
            description="Experience realistic interview simulations with AI-driven feedback to improve your responses, communication, and confidence."
            onClick={handleMockInterviewClick}
            isClickable={true}
          />

          <FeatureCard
            icon={<Lock className="text-yellow-400 w-6 h-6" />}
            title="Centralized Preparation Hub"
            description="Access a one-stop resource center with templates, industry insights, and preparation guides to streamline your job search process."
          />

          <FeatureCard
            icon={<ClipboardList className="text-yellow-400 w-6 h-6" />}
            title="Job Description-Based Resources"
            description="Simply upload a job description to receive tailored study materials, practice questions, and key skills to focus on."
          />

          <FeatureCard
            icon={<FileText className="text-yellow-400 w-6 h-6" />}
            title="AI-Powered Resume Analysis"
            description="Upload your resume and get instant, actionable feedback to optimize it for ATS systems and recruiters."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;