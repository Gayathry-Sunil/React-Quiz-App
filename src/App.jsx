import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: "What is the main function of the CPU in a computer system?",
    options: [
      "To execute instructions and process data",
      "To store data permanently",
      "To provide power to the motherboard",
      "To connect to the internet"
    ],
    answer: "To execute instructions and process data",
  },
  {
    question: "Which of the following is a programming language?",
    options: ["HTML", "CSS", "Java", "SQL"],
    answer: "Java",
  },
  {
    question: "What is the primary purpose of an operating system?",
    options: ["To provide internet access", "To manage hardware and software resources", "To run applications", "To secure data"],
    answer: "To manage hardware and software resources",
  },
  {
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    answer: "Stack",
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlink and Text Markup Language", "Hyper Text Multi Language"],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which of the following is used to create dynamic web pages?",
    options: ["HTML", "CSS", "JavaScript", "XML"],
    answer: "JavaScript",
  },
  {
    question: "What is the function of a router in a network?",
    options: ["To connect devices within a local area network", "To assign IP addresses to devices", "To direct data packets between different networks", "To manage network traffic"],
    answer: "To direct data packets between different networks",
  },
  {
    question: "Which of the following is an example of a relational database?",
    options: ["MongoDB", "MySQL", "Cassandra", "Redis"],
    answer: "MySQL",
  },
  {
    question: "What does the acronym 'API' stand for?",
    options: ["Application Programming Interface", "Application Protocol Interface", "Automated Programming Interface", "Application Process Interface"],
    answer: "Application Programming Interface",
  },
  {
    question: "In machine learning, what does 'training' refer to?",
    options: ["The process of collecting data", "The phase where algorithms learn from data", "The evaluation of a model's performance", "The documentation of a model"],
    answer: "The phase where algorithms learn from data",
  },
];

const StartScreen = ({ onStart }) => (
  <div className="start-container">
    {/* <h2>Quiz App</h2> */}
    <button className="start-button" onClick={onStart}>Start Playing</button>
  </div>
);

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setQuizComplete(false);
    setSelectedOption(null);
    setQuizStarted(false); // Reset quiz started state
  };

  const startQuiz = () => {
    setQuizStarted(true); // Start the quiz
  };

  const getMotivationMessage = () => {
    if (correctAnswers < 5) {
      return "Keep it up! Try harder! 💪";
    } else if (correctAnswers >= 5 && correctAnswers < 9) {
      return "Good job! Keep trying to get better! 🌟";
    } else {
      return "Excellent! 🎉";
    }
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {!quizStarted ? (
        <StartScreen onStart={startQuiz} />
      ) : quizComplete ? (
        <div className="result">
          <h2>Result</h2>
          <div>Total Questions: <strong>{questions.length}</strong></div>
          <div>Score: <strong className="highlight">{score / 10}</strong>/{questions.length}</div>
          <div className="results-row">
            <div>Correct Answers: <strong>{correctAnswers}</strong></div>
            <div>Wrong Answers: <strong>{questions.length - correctAnswers}</strong></div>
          </div>
          <div className="motivation">{getMotivationMessage()}</div>
          <button className="play-again-button" onClick={handlePlayAgain}>Play Again</button>
        </div>
      ) : (
            <div className="question-container">
              <div className="breadcrumbs">{currentQuestion + 1}/{questions.length}</div>
              <div className="question">{questions[currentQuestion].question}</div>
              <div className="options">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    className={`option ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                className="next-button"
                onClick={handleNextQuestion}
                disabled={!selectedOption}
              >
                Next
          </button>
            </div>
          )}
    </div>
  );
};

export default App;
