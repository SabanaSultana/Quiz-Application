import { useNavigate } from "react-router-dom";

const QuizList = ({ quizzes }) => {
  const navigate = useNavigate();

  const handleTakeQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <h2>{quiz.title}</h2>
          <button onClick={() => handleTakeQuiz(quiz._id)}>Take Quiz</button>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
