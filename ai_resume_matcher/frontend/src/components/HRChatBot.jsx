import { useState, useEffect } from "react";
import axios from "axios";

 
function HRChatBot({ isOpen, onClose }) {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", message: "Hi! I can help you practice answering interview questions. Ready to start?" }
  ]);
  const [isCompleted, setIsCompleted] = useState(false);

   
  const handleStartChat = () => {
    axios.get("/api/chatbot/hr-questions/start-chat/")
      .then(response => {
        setCurrentId(response.data.id);
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
 
    axios.post("/api/chatbot/hr-questions/next-question/", {
      current_id: currentId,
      user_answer: userAnswer
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">HR Interview Practice Bot</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`mb-3 ${chat.role === "user" ? "text-right" : ""}`}
            >
              <div 
                className={`inline-block px-4 py-2 rounded-lg ${
                  chat.role === "user" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
          {chatHistory.length === 1 && (
            <div className="text-center my-8">
              <button 
                onClick={handleStartChat}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Start Interview Practice
              </button>
            </div>
          )}
          {isCompleted && (
            <div className="text-center my-8">
              <button 
                onClick={resetChat}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Practice Again
              </button>
            </div>
          )}
        </div>
        
      
        {chatHistory.length > 1 && !isCompleted && (
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
              />
              <button
                onClick={handleSubmitAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
