import { useState } from "react";
import axios from "axios";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.map((q, i) => (i === index ? value : q));
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/quizzes", { title, questions });
      alert("Quiz created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Question ${index + 1}`}
          value={question}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
        />
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default QuizForm;
