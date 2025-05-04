// HRInterviewPractice.jsx
import HRQuestionsPage from "./HRQuestionsPage";
import HRChatBot from "./HRChatBot";

export default function HRInterviewPractice() {
  return (
    <div className="p-6">
      <HRChatBot />
      <hr className="my-6" />
      <HRQuestionsPage />
    </div>
  );
}
