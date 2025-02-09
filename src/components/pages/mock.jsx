import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// API key should ideally be handled securely through environment variables
// For demo purposes, we'll store it directly (not recommended for production)
const GEMINI_API_KEY = "AIzaSyBtbx2E0VnXPKU0eJZMpnJWk9D0lyhfL_I";

const MockInterview = () => {
  const [formData, setFormData] = useState({
    workExperience: '',
    skills: '',
    jobDescription: ''
  });
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startInterview = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const prompt = formData.workExperience ? 
        `You are an interviewer conducting a job interview. Based on the following details:
        Work Experience: ${formData.workExperience}
        Skills: ${formData.skills}
        Job Description: ${formData.jobDescription}
        
        Act as the interviewer and ask one question at a time. Start with an introduction and your first question.
        Make the questions challenging but relevant to the provided job description and skills.
        Be conversational and respond naturally to the candidate's answers.
        Mix both technical and behavioral questions.` :
        `You are conducting a job interview for a software developer position. 
        Start by introducing yourself briefly and ask your first question.
        Keep your responses concise and ask one question at a time.
        Mix technical and behavioral questions naturally.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages([{
        role: 'Interviewer',
        text: text
      }]);
      setInterviewStarted(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to start the interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setUserInput('');
    setLoading(true);

    // Add user's message
    setMessages(prev => [...prev, {
      role: 'Candidate',
      text: userMessage
    }]);

    try {
      const chatHistory = messages.map(msg => 
        `${msg.role}: ${msg.text}`
      ).join('\n');

      const prompt = `Previous conversation:\n${chatHistory}\n\nCandidate: ${userMessage}\n\nBased on the candidate's response, evaluate their answer briefly if needed and ask your next interview question. Keep your response focused and clear. Mix technical and behavioral questions naturally. Ask one question at a time.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, {
        role: 'Interviewer',
        text: text
      }]);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderBackgroundForm = () => (
    <form onSubmit={startInterview} className="space-y-8">
      <div className="bg-slate-800 rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-mono text-white mb-4">Background Information (Optional)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Work Experience</label>
            <textarea
              name="workExperience"
              value={formData.workExperience}
              onChange={handleInputChange}
              className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
              rows="4"
              placeholder="Describe your work experience..."
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
              rows="4"
              placeholder="List your skills..."
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Target Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
              rows="6"
              placeholder="Paste or enter the job description here..."
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-4 px-6 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Starting Interview...' : 'Start Interview'}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );

  const renderChatInterface = () => (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === 'Interviewer'
                  ? 'bg-slate-700/50 text-indigo-400'
                  : 'bg-slate-700/30 text-gray-300'
              }`}
            >
              <strong>{message.role}:</strong> {message.text}
            </div>
          ))}
          {loading && (
            <div className="bg-slate-700/50 text-indigo-400 p-4 rounded-lg">
              <strong>Interviewer:</strong> Typing...
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono text-white mb-4">
            Interactive Mock Interview
          </h2>
          <p className="text-gray-400 text-lg">
            Chat with an AI interviewer based on your experience and goals
          </p>
        </div>

        {!interviewStarted ? renderBackgroundForm() : renderChatInterface()}

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;