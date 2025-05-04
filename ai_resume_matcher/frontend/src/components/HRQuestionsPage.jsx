function HRQuestionsPage({ questions }) {
  return (
    <div className="space-y-4">
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{q.question}</h3>
              {q.category && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {q.category}
                </span>
              )}
            </div>
            <p className="text-gray-700 mt-3">{q.answer}</p>
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
