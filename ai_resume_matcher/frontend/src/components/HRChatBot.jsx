// HRChatBot.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function HRChatBot() {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchNewQuestion = () => {
    axios.get("/api/hr-questions/random/").then((res) => {
      setQuestion(res.data);
      setUserAnswer("");
      setFeedback("");
    });
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const checkAnswer = () => {
    if (
      userAnswer.toLowerCase().trim().includes(question.answer.toLowerCase().split(" ")[0])
    ) {
      setFeedback("✅ Correct! Moving to next question...");
      setTimeout(fetchNewQuestion, 2000);
    } else {
      setFeedback(`❌ Incorrect. Suggested answer: ${question.answer}`);
      setTimeout(fetchNewQuestion, 4000);
    }
  };

  return (
    <div className="p-4 mt-6 bg-gray-100 rounded shadow">
      <h3 className="text-xl font-bold mb-2">HR Chatbot</h3>
      {question && (
        <>
          <p className="mb-2">🤖 {question.question}</p>
          <input
            className="border p-2 w-full mb-2"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <div className="mt-2">{feedback}</div>
        </>
      )}
    </div>
  );
}
