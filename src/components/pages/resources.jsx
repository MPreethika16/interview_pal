import React, { useState } from "react";
import { Search, BookOpen, Youtube, ExternalLink } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyBfp3CrwuGnqalD38RW-IpoPh6STaxHZcw";

const Card = ({ children, className = "", onClick, clickable = false }) => (
  <div
    className={`bg-slate-800 border border-slate-700 rounded-lg ${
      clickable
        ? "cursor-pointer hover:border-indigo-500 transition-colors"
        : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="p-6 pb-2">{children}</div>;
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-mono text-white ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-2 ${className}`}>{children}</div>
);

const ResourceCard = ({ resource, type }) => {
  const handleClick = () => {
    window.open(resource.url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-slate-700/50 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
    >
      <div className="flex justify-between items-start">
        <h4 className="text-indigo-400 font-medium mb-1">{resource.title}</h4>
        <ExternalLink className="w-4 h-4 text-indigo-400" />
      </div>
      <p className="text-gray-300 text-sm mb-2">{resource.description}</p>
      {type === "youtube" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm">
            Watch Video <Youtube className="w-4 h-4" />
          </div>
          <span className="text-indigo-300 text-sm">
            {resource.views} views
          </span>
        </div>
      )}
    </div>
  );
};

const Resources = () => {
  const [formData, setFormData] = useState({ jobRole: "", jobDescription: "" });
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  //const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cleanJsonResponse = (text) => {
    let cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    cleaned = cleaned.trim();
    cleaned = cleaned.replace(/^\n+/, "");
    return cleaned;
  };

  const fetchResources = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResources(null);

    try {
      const prompt = `Return a clean JSON object (no markdown) with learning resources for:
Job Role: ${formData.jobRole}
Job Description: ${formData.jobDescription}

Format:
{
  "learningResources": [{"title": "", "description": "", "url": ""}],
  "youtubeResources": [{"title": "", "description": "", "url": "", "views": ""}],
  "keySkills": ["skill1", "skill2", "skill3"]
}

Requirements:
- All resources must include direct, valid URLs
- YouTube resources should be the most viewed/popular videos for the topic
- YouTube views should be formatted like "1.2M" or "500K"
- Include at least 3 resources of each type`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      const cleanedText = cleanJsonResponse(text);
      const parsedResources = JSON.parse(cleanedText);
      setResources(parsedResources);
    } catch (err) {
      console.error("Error:", err);
      setError("Please try again with a different job description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-mono text-white mb-4">
          Learning Resources
        </h2>
        <p className="text-gray-400 text-lg">
          Get personalized learning resources for your career path
        </p>
      </div>

      <form
        onSubmit={fetchResources}
        className="max-w-3xl mx-auto space-y-6 mb-8 bg-slate-800 p-6 rounded-lg"
      >
        <div>
          <label className="block text-gray-300 mb-2">Job Role</label>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            placeholder="e.g., Frontend Developer"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600"
            rows="6"
            placeholder="Paste the job description here..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-4 flex items-center justify-center gap-2 font-medium disabled:opacity-50"
        >
          {loading ? "Searching..." : "Find Resources"}
          <Search className="w-5 h-5" />
        </button>
      </form>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {resources && (
        <div className="max-w-3xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Key Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {resources.keySkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-600/30 text-indigo-400 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resources.learningResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} type="learning" />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="w-5 h-5" /> Most Viewed YouTube Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resources.youtubeResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} type="youtube" />
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Resources;
