// HRQuestionsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function HRQuestionsPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("/api/hr-questions/").then((res) => setQuestions(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">HR Interview Questions</h2>
      <div className="space-y-2">
        {questions.map((q, idx) => (
          <div key={idx} className="p-4 bg-white rounded shadow">
            <p className="font-semibold">Q: {q.question}</p>
            <p className="text-gray-700">A: {q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
