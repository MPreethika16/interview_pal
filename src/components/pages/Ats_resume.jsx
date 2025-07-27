// import React, { useState } from 'react';

// const Ats_resume = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [resumeText, setResumeText] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const GEMINI_API_KEY = "AIzaSyBtbx2E0VnXPKU0eJZMpnJWk9D0lyhfL_I";

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (
//         file.type === 'application/pdf' ||
//         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
//         file.type === 'text/plain'
//       ) {
//         setSelectedFile(file);
//       } else {
//         setSelectedFile(null);
//         showCustomModal('Please upload a PDF, DOCX, or TXT file.');
//       }
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     event.currentTarget.classList.add('border-purple-500');
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     event.currentTarget.classList.remove('border-purple-500');
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     event.currentTarget.classList.remove('border-purple-500');

//     const file = event.dataTransfer.files[0];
//     if (file) {
//       if (
//         file.type === 'application/pdf' ||
//         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
//         file.type === 'text/plain'
//       ) {
//         setSelectedFile(file);
//       } else {
//         setSelectedFile(null);
//         showCustomModal('Please upload a PDF, DOCX, or TXT file.');
//       }
//     }
//   };

//   const showCustomModal = (message) => {
//     setModalMessage(message);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalMessage('');
//   };

//   const handleAnalyzeResume = async () => {
//     if (!resumeText.trim()) {
//       showCustomModal('Please paste your resume content to analyze.');
//       return;
//     }

//     setIsLoading(true);
//     setFeedback('');

//     try {
//       let prompt = `Analyze the following resume content for strengths, weaknesses, and suggestions for improvement.`;
//       prompt += `\n\nResume Content:\n${resumeText}`;

//       if (jobDescription.trim()) {
//         prompt += `\n\nConsider this Job Description for tailored feedback:\n${jobDescription}`;
//       }

//       prompt += `\n\nProvide actionable advice to optimize it for ATS systems and recruiters. Format your response clearly with sections for Strengths, Weaknesses, and Recommendations.`;

//       const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
//       const payload = { contents: chatHistory };

//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error.message}`);
//       }

//       const result = await response.json();

//       if (
//         result.candidates &&
//         result.candidates.length > 0 &&
//         result.candidates[0].content &&
//         result.candidates[0].content.parts &&
//         result.candidates[0].content.parts.length > 0
//       ) {
//         const text = result.candidates[0].content.parts[0].text;
//         setFeedback(text);
//       } else {
//         showCustomModal('No valid feedback received from the AI. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       showCustomModal(`Failed to analyze resume: ${error.message}. Please try again.`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 font-inter flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-3">AI-Powered Resume Analysis</h1>
//         <p className="text-lg sm:text-xl text-gray-300">Get instant, actionable feedback to optimize your resume</p>
//       </div>

//       <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
//         <div className="mb-6">
//           <label htmlFor="resume-content" className="block text-gray-300 text-lg font-medium mb-2">
//             Paste Your Resume Content
//           </label>
//           <textarea
//             id="resume-content"
//             className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-100 h-48 resize-y"
//             placeholder="Paste your resume text here..."
//             value={resumeText}
//             onChange={(e) => setResumeText(e.target.value)}
//           ></textarea>
//         </div>

//         <div className="mb-6">
//           <label htmlFor="resume-upload" className="block text-gray-300 text-lg font-medium mb-2">
//             Or Upload Resume File (for display only)
//           </label>
//           <div
//             className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:border-purple-500 transition-colors duration-200"
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//             onClick={() => document.getElementById('file-input').click()}
//           >
//             <input
//               id="file-input"
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//               accept=".pdf,.docx,.txt"
//             />
//             {selectedFile ? (
//               <p className="text-gray-300 text-center">
//                 File selected: <span className="font-semibold">{selectedFile.name}</span>
//               </p>
//             ) : (
//               <p className="text-gray-400 text-center">Drag and drop your resume here or click to browse</p>
//             )}
//           </div>
//           <p className="text-sm text-gray-500 mt-2">Accepted formats: .pdf, .docx, .txt</p>
//         </div>

//         <div className="mb-8">
//           <label htmlFor="job-description" className="block text-gray-300 text-lg font-medium mb-2">
//             Optional: Paste Job Description (for tailored feedback)
//           </label>
//           <textarea
//             id="job-description"
//             className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-100 h-32 resize-y"
//             placeholder="Paste the job description here (optional)..."
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//           ></textarea>
//         </div>

//         <button
//           onClick={handleAnalyzeResume}
//           className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               <span>Analyzing...</span>
//             </>
//           ) : (
//             <>
//               <span>Analyze Resume</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </>
//           )}
//         </button>

//         {feedback && (
//           <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow-inner border border-gray-600">
//             <h2 className="text-2xl font-semibold text-purple-400 mb-4">Analysis Feedback</h2>
//             <div className="prose prose-invert text-gray-200 leading-relaxed max-w-none">
//               {feedback.split('\n').map((line, index) => (
//                 <p key={index} className="mb-2">{line}</p>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 max-w-md w-full text-center">
//             <h3 className="text-xl font-semibold text-red-400 mb-4">Error</h3>
//             <p className="text-gray-200 mb-6">{modalMessage}</p>
//             <button
//               onClick={closeModal}
//               className="py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors duration-200"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ats_resume;

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Ats_resume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [atsScore, setAtsScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const GEMINI_API_KEY = "AIzaSyBtbx2E0VnXPKU0eJZMpnJWk9D0lyhfL_I";

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(file.type)) {
      setSelectedFile(null);
      showCustomModal('Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    setSelectedFile(file);

    try {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
          }
          setResumeText(text);
        };
        reader.readAsArrayBuffer(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const reader = new FileReader();
        reader.onload = async () => {
          const result = await mammoth.extractRawText({ arrayBuffer: reader.result });
          setResumeText(result.value);
        };
        reader.readAsArrayBuffer(file);
      } else if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = () => setResumeText(reader.result);
        reader.readAsText(file);
      }
    } catch (err) {
      showCustomModal('Error reading file: ' + err.message);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-purple-500');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-500');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-500');
    handleFileChange({ target: { files: [event.dataTransfer.files[0]] } });
  };

  const showCustomModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const handleAnalyzeResume = async () => {
    if (!resumeText.trim()) {
      showCustomModal('Please upload a readable resume file (.pdf, .docx, or .txt).');
      return;
    }

    setIsLoading(true);
    setFeedback('');
    setAtsScore(null);

    try {
      let prompt = `Analyze the following resume content. Provide:\n- Top 3 strengths\n- Top 3 weaknesses\n- Specific improvement tips\n- Relevant keywords\n- ATS Score (0-100)\n\nRespond in clean bullet points with section titles.`;

      prompt += `\n\nResume Content:\n${resumeText}`;

      if (jobDescription.trim()) {
        prompt += `\n\nJob Description:\n${jobDescription}`;
      }

      const payload = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error.message}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        showCustomModal('No valid feedback received from Gemini. Try again.');
        return;
      }

      setFeedback(text);
      const scoreMatch = text.match(/ATS Score:\s*(\d{1,3})/);
      if (scoreMatch) setAtsScore(Number(scoreMatch[1]));

    } catch (error) {
      showCustomModal(`Analysis failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">AI-Powered Resume Analysis</h1>
      <p className="text-gray-300 mb-8">Upload your resume and get instant feedback</p>

      {atsScore !== null && (
        <div className="mb-6 text-center">
          <div className="w-32 h-32 relative">
            <svg className="w-full h-full">
              <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
              <circle
                className="text-purple-500"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset={`${314 - (atsScore / 100) * 314}`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              {atsScore}%
            </span>
          </div>
          <p className="text-purple-300 mt-2">ATS Score</p>
        </div>
      )}

      <div
        className="w-full max-w-3xl h-32 mb-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-800 flex items-center justify-center cursor-pointer hover:border-purple-500"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
        />
        {selectedFile ? (
          <p>File selected: <span className="font-semibold">{selectedFile.name}</span></p>
        ) : (
          <p className="text-gray-400">Drag and drop your resume here or click to browse</p>
        )}
      </div>

      <textarea
        className="w-full max-w-3xl mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-100"
        placeholder="Optional: Paste job description for tailored feedback..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
      />

      <button
        onClick={handleAnalyzeResume}
        disabled={isLoading}
        className="mb-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {feedback && (
        <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl text-purple-400 font-semibold mb-4">Feedback</h2>
          <div className="prose prose-invert whitespace-pre-wrap">{feedback}</div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-xl border border-gray-600 max-w-md w-full text-center">
            <h3 className="text-xl text-red-400 font-semibold mb-4">Error</h3>
            <p className="text-gray-300 mb-4">{modalMessage}</p>
            <button onClick={closeModal} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ats_resume;

