import { useState, useEffect } from "react";
import axios from "axios";
import api from '../api/axiosConfig'

function HRChatBot({ isOpen, onClose }) {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [askedIds, setAskedIds] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", message: "Hi! I can help you practice answering interview questions. Ready to start?" }
  ]);
  const [isCompleted, setIsCompleted] = useState(false);

   
  const handleStartChat = () => {
    api.get("/chatbot/hr-questions/start-chat/")
      .then(response => {
        setCurrentId(response.data.id);
        setAskedIds([response.data.id]);
        setChatHistory([
          ...chatHistory,
          { role: "bot", message: "Great! Here's your first question:" },
          { role: "bot", message: response.data.question }
        ]);
      })
      .catch(error => {
        console.error("Error starting chat:", error);
        setChatHistory([
          ...chatHistory,
          { role: "bot", message: "Sorry, I couldn't load the questions. Please try again later." }
        ]);
      });
  };

 
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback("Please provide an answer before submitting.");
      return;
    }

    setChatHistory([
      ...chatHistory,
      { role: "user", message: userAnswer }
    ]);
 
    api.post("/chatbot/hr-questions/next-question/", {
      current_id: currentId,
      user_answer: userAnswer,
      asked_ids: askedIds
    })
      .then(response => {
         
        setChatHistory(prev => [
          ...prev,
          { role: "bot", message: response.data.feedback }
        ]);

        
        if (response.data.next_question) {
          setTimeout(() => {
            setChatHistory(prev => [
              ...prev,
              { role: "bot", message: "Here's your next question:" },
              { role: "bot", message: response.data.next_question }
            ]);
            setCurrentId(response.data.id);
            setAskedIds(response.data.asked_ids);
          }, 1000);
        } 
        
        else if (response.data.message) {
          setTimeout(() => {
            setChatHistory(prev => [
              ...prev,
              { role: "bot", message: response.data.message }
            ]);
            setIsCompleted(true);
          }, 1000);
        }

        setUserAnswer("");
      })
      .catch(error => {
        console.error("Error submitting answer:", error);
        setChatHistory(prev => [
          ...prev,
          { role: "bot", message: "Sorry, there was an error processing your answer. Please try again." }
        ]);
      });
  };

   
  const resetChat = () => {
    setChatHistory([
      { role: "bot", message: "Hi! I can help you practice answering interview questions. Ready to start?" }
    ]);
    setIsCompleted(false);
    setUserAnswer("");
    setCurrentId(null);
    setAskedIds([]); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-blue-200 overflow-hidden">
        
       
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 flex justify-between items-center">
          <h3 className="text-white font-extrabold text-xl tracking-wide">🚀 HR Interview Practice Bot</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-transform transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        {/* Chat Area */}
        <div className="h-96 overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-gray-100 space-y-2">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`px-4 py-2 rounded-xl max-w-xs break-words shadow-sm ${
                  chat.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
  
          {chatHistory.length === 1 && (
            <div className="text-center mt-10">
              <button 
                onClick={handleStartChat}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-300"
              >
                🚀 Start Interview Practice
              </button>
            </div>
          )}
  
          {isCompleted && (
            <div className="text-center mt-10">
              <button 
                onClick={resetChat}
                className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-600 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-300"
              >
                🔄 Practice Again
              </button>
            </div>
          )}
        </div>
  
        {/* Answer Input */}
        {chatHistory.length > 1 && !isCompleted && (
          <div className="p-4 border-t bg-white">
            <div className="flex">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="flex-grow p-2 border border-gray-300 rounded-l-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
              />
              <button
                onClick={handleSubmitAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-full transition-colors duration-300"
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
export default HRChatBot