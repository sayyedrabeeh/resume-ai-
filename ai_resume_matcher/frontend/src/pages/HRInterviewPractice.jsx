export default function HRInterviewPractice() {
    const [searchQuery, setSearchQuery] = useState("");
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    
     
    useEffect(() => {
      setIsLoading(true);
      axios.get("/api/chatbot/hr-questions/")
        .then(response => {
         
          const questionsData = response.data;
          setQuestions(questionsData);
          setFilteredQuestions(questionsData);
          
           
          const categorySet = new Set(questionsData
            .filter(q => q.category)
            .map(q => q.category));
          
          if (categorySet.size > 0) {
            setCategories(["All", ...Array.from(categorySet)]);
          }
          
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching questions:", error);
          setIsLoading(false);
        });
    }, []);
    
     
    useEffect(() => {
      let result = [...questions];
      
      if (searchQuery) {
        result = result.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedCategory !== "All") {
        result = result.filter(q => q.category === selectedCategory);
      }
      
      setFilteredQuestions(result);
    }, [searchQuery, selectedCategory, questions]);
    
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">HR Interview Practice</h1>
          <p className="opacity-90">Prepare for your next interview with confidence</p>
        </header>
        
       
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {categories.length > 1 && (
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        
         
        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">Loading questions...</p>
          </div>
        ) : (
          <HRQuestionsPage questions={filteredQuestions} />
        )}
        
        
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        
        
        <HRChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        
        <footer className="mt-12 text-center text-gray-500 py-6">
          <p>© {new Date().getFullYear()} Resumatch.All rights reserved.</p>
        </footer>
      </div>
    );
  }