import { useState, useEffect } from "react";
import HRChatBot from "../components/HRChatBot";
import HRQuestionsPage from "../components/HRQuestionsPage";
import api from "../api/axiosConfig";
import { Bot } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export default function HRInterviewPractice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/chatbot/hr-questions/")
      .then((response) => {
        const questionsData = response.data;
        setQuestions(questionsData);
        setFilteredQuestions(questionsData);

        const categorySet = new Set(
          questionsData.filter((q) => q.category).map((q) => q.category)
        );

        if (categorySet.size > 0) {
          setCategories(["All", ...Array.from(categorySet)]);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...questions];

    if (searchQuery) {
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((q) => q.category === selectedCategory);
    }

    setFilteredQuestions(result);
    setCurrentPage(1);  
  }, [searchQuery, selectedCategory, questions]);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-l from-[#E83D95] to-black min-h-screen">
      <header className="bg-black/50  p-6 rounded-lg shadow-lg mb-6 flex items-center justify-between">
        <div>
        <h1 className="text-3xl text-[#FF77FF]/50 font-heading font-bold mb-2">HR Interview Practice</h1>
          <p className="opacity-90 text-white/70">Prepare for your next interview with confidence</p>
          </div>
        <div>
        <Link 
                            to="/"
                            className="text-white/80 hover:text-white/50 flex items-center gap-1 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Back to Dashboard
          </Link>
          </div>
      </header>

      <div className="bg-black/50 p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF77FF]/50 focus:border-[#FF77FF] "
            />
          </div>
          {categories.length > 1 && (
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF77FF]/50  focus:border-[#FF77FF]/50  bg-black/50"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 bg-black/50 rounded-lg shadow">
          <p className="text-gray-600">Loading questions...</p>
        </div>
      ) : (
        <>
          <HRQuestionsPage questions={paginatedQuestions} />

          
          {filteredQuestions.length > itemsPerPage && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({
                length: Math.ceil(filteredQuestions.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-[#FF77FF]/50  text-white"
                      : "bg-black/60 border border-black/40"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

       <button
         onClick={() => setIsChatOpen(true)}
         className="fixed bottom-6 right-6 flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-3 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/40"
       >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24">
           <path d="M12 2a1 1 0 011 1v1.07A8.001 8.001 0 0120 12v3a2 2 0 002 2v1a1 1 0 01-1 1h-1a3 3 0 01-6 0H10a3 3 0 01-6 0H3a1 1 0 01-1-1v-1a2 2 0 002-2v-3a8.001 8.001 0 017-7.93V3a1 1 0 011-1zm-4 9a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
         </svg>
         <span className="font-medium text-white">Chat with Bot</span>
       </button>
       

      <HRChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <footer className="mt-12 text-center text-gray-500 py-6">
        <p>© {new Date().getFullYear()} Resumatch. All rights reserved.</p>
      </footer>
    </div>
  );
}
