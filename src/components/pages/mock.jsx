import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual API key
const GEMINI_API_KEY = "AIzaSyBtbx2E0VnXPKU0eJZMpnJWk9D0lyhfL_I";

const MockInterview = () => {
  const [formData, setFormData] = useState({
    workExperience: '',
    skills: '',
    jobRole: '',
    jobDescription: ''
  });
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);

  // Initialize the model
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
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const prompt = `You are an experienced technical interviewer named Interview Pal. Based on the following candidate details:
      - Work Experience: ${formData.workExperience}
      - Skills: ${formData.skills}
      - Job Role: ${formData.jobRole}
      - Job Description: ${formData.jobDescription}
      
      **Instructions:**
      1. **Start with a warm, professional introduction** (1-2 sentences).
      2. **Begin with basic, introductory questions** to make the candidate comfortable (e.g., about their background, interest in the role, or general experience).
      3. **Gradually transition to role-specific questions** based on the job description and required skills.
      4. **Finally, ask experience-based questions** that dive into their past work, projects, and achievements.
      5. **Keep the tone conversational and professional**—like a real human interviewer.
      6. **Ask only one question at a time** and wait for the candidate’s response before moving to the next question.
      7. **Focus on their skills, experience, and the job requirements** to make the questions relevant and personalized.
      8. **Avoid explanations or long preambles**—just ask the question naturally.
      
      **Flow of the Interview:**
      1. **Introductory Questions** (e.g., background, interest in the role).
      2. **Role-Specific Questions** (e.g., technical skills, tools, or methodologies relevant to the job).
      3. **Experience-Based Questions** (e.g., past projects, challenges, and achievements).
      
      **Example Output:**
      "Hi, I'm Interview Pal. Thanks for joining me today! Let’s start with a quick introduction—can you tell me a little about yourself and what drew you to this role?"
      
      ---
      
     ### **Key Adjustments:**
1. **Natural Flow:** The interview now progresses logically—starting with basic intro questions, then moving to role-specific questions, and finally diving into experience-based questions.
2. **Human-Like Tone:** The tone is conversational and professional, mimicking a real interviewer.
3. **One Question at a Time:** Ensures the candidate has time to respond before the next question is asked.
4. **Personalized Questions:** Questions are tailored to the candidate’s skills, experience, and job role.`

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages([{
        role: 'Interviewer',
        text: text || `Hello! I'm conducting interviews for the ${formData.jobRole} position. Based on your background, let's start with a technical question related to ${formData.skills.split(',')[0]}.`
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

    setMessages(prev => [...prev, {
      role: 'Candidate',
      text: userMessage
    }]);

    try {
      const chatHistory = messages.map(msg => 
        `${msg.role}: ${msg.text}`
      ).join('\n\n');

      const prompt = `Previous interview conversation:
        ${chatHistory}

        Candidate background:
        Role: ${formData.jobRole}
        Experience: ${formData.workExperience}
        Skills: ${formData.skills}
        Job Description: ${formData.jobDescription}

        Candidate's last response: "${userMessage}"

        You are the technical interviewer. Based on the candidate's response and background:
        1. Briefly acknowledge their answer (1 sentence)
        2. Ask your next technical question
        
        Guidelines:
        - Focus on skills mentioned in their background
        - Match questions to the job description requirements
        - Keep questions relevant to their experience level
        - Ask only ONE clear question
        - Stay technical and specific
        
        Stay in character as the interviewer and keep the tone professional.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text && text.trim()) {
        setMessages(prev => [...prev, {
          role: 'Interviewer',
          text: text
        }]);
      } else {
        throw new Error('Empty response');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, {
        role: 'Interviewer',
        text: `Thank you for that answer. Let's focus on another aspect of ${formData.jobRole}. Could you explain how you've used ${formData.skills.split(',')[0]} in your recent projects?`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderBackgroundForm = () => (
    <form onSubmit={startInterview} className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-mono text-white mb-4">Background Information</h3>
        
        <div>
          <label className="block text-gray-300 mb-2">Job Role</label>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            placeholder="e.g., Senior React Developer, Frontend Engineer"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Work Experience</label>
          <textarea
            name="workExperience"
            value={formData.workExperience}
            onChange={handleInputChange}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            rows="3"
            placeholder="Describe your relevant work experience..."
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            rows="3"
            placeholder="List your technical skills (e.g., React, JavaScript, TypeScript, Node.js)"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Target Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            rows="4"
            placeholder="Paste the job description you're targeting..."
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-4 px-6 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Starting Interview...' : 'Start Interview'}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );

  const renderChatInterface = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'Interviewer' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {message.role === 'Interviewer' ? '🤖' : '👤'}
              </div>
              <div className={`p-4 rounded-lg flex-1 ${
                message.role === 'Interviewer' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                🤖
              </div>
              <div className="p-4 rounded-lg bg-gray-700 text-white animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Technical Interview Simulation</h1>
          <p className="text-gray-400">Personalized interview based on your background</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {!interviewStarted ? renderBackgroundForm() : renderChatInterface()}
      </div>
    </div>
  );
};

export default MockInterview;