import { useState } from "react";

function Quiz() {

  const questions = [
    {
      question: "Who created React?",
      options: [
        "Google",
        "Facebook",
        "Microsoft"
      ],
      answer: "Facebook"
    },
    {
      question: "Which hook stores state?",
      options: [
        "useFetch",
        "useState",
        "usePage"
      ],
      answer: "useState"
    },
    {
      question: "Which method renders lists in React?",
      options: [
        "forEach",
        "map",
        "sort"
      ],
      answer: "map"
    }
  ];

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [quizFinished, setQuizFinished] =
    useState(false);

  function handleNext() {

    if (
      answer ===
      questions[currentQuestion].answer
    ) {
      setScore(score + 1);
    }

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion(
        currentQuestion + 1
      );
      setAnswer("");
    }
  }

  if (quizFinished) {
    return (
      <div className="card">
        <h2>Quiz Complete</h2>

        <p>
          Final Score:
          {" "}
          {score}/{questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="card">

      <h2>React Quiz</h2>

      <p>
        Question {currentQuestion + 1}
        {" "}of{" "}
        {questions.length}
      </p>

      <p>
        {
          questions[currentQuestion]
            .question
        }
      </p>

      <select
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
      >
        <option value="">
          Select Answer
        </option>

        {
          questions[currentQuestion]
            .options.map(option => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))
        }

      </select>

      <br />
      <br />

      <button onClick={handleNext}>
        {
          currentQuestion ===
          questions.length - 1
            ? "Finish Quiz"
            : "Next Question"
        }
      </button>

      <p>
        Current Score: {score}
      </p>

    </div>
  );
}

export default Quiz;