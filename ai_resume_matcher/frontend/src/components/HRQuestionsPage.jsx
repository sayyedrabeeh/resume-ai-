function HRQuestionsPage({ questions }) {
  return (
    <div className="space-y-4">
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id} className="bg-black/50 p-6 rounded-lg shadow-md border-l-4 border-[#FF77FF]/50 ">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl text-[#FF77FF]/50  font-bold">{q.question}</h3>
              {q.category && (
                <span className="bg-black/50  text-[#FF77FF]/50  px-3 py-1 rounded-full text-sm font-medium">
                  {q.category}
                </span>
              )}
            </div>
            <p className="text-white/80  mt-3">{q.answer}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">No questions found or loading...</p>
        </div>
      )}
    </div>
  );
}
export default HRQuestionsPage