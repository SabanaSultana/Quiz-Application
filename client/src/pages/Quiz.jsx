import { useState, useEffect } from "react";
import axios from "axios";
import QuizForm from "../components/QuizForm";
import QuizList from "../components/QuizList";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/api/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <QuizForm />
      <QuizList quizzes={quizzes} />
    </div>
  );
};

export default Quiz;
