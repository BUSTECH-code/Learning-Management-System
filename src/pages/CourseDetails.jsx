import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import courseData from "../data/courses";

function CourseDetails() {
  const { id } = useParams();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userEmail = user?.email || "anonymous";

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    if (!savedCourses) return courseData;

    const parsed = JSON.parse(savedCourses);
    if (parsed[0] && parsed[0].lessons[0] && (!parsed[0].lessons[0].quiz || !Array.isArray(parsed[0].lessons[0].quiz))) {
      console.warn("Old data schema detected in localStorage. Wiping cache...");
      localStorage.removeItem("courses");
      return courseData;
    }
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const course = courses.find((c) => c.id === Number(id));

  const [userProgress, setUserProgress] = useState(() => {
    const savedProgress = localStorage.getItem("userProgress");
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [prevId, setPrevId] = useState(id);
  const [prevLessonIndex, setPrevLessonIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");

  if (id !== prevId) {
    setPrevId(id);
    setActiveLessonIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setQuizFeedback("");
  }

  if (activeLessonIndex !== prevLessonIndex) {
    setPrevLessonIndex(activeLessonIndex);
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setQuizFeedback("");
  }

  if (!course) {
    return (
      <div className="error-fallback-panel">
        <h2>Course not found</h2>
        <Link to="/courses" className="back-catalog-link">Return to Courses</Link>
      </div>
    );
  }

  const handleDirectEnrollment = () => {
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === course.id
          ? { ...c, enrolled: true, studentCount: c.studentCount + 1 }
          : c
      )
    );
  };

  // ACCESS GATEWAY INTERFACE (When course is locked)
  if (!course.enrolled) {
    return (
      <div className="course-locked-gateway">
        <div className="lock-icon-badge">🔒</div>
        <h2>Lesson Content Locked</h2>
        <p>
          You must be enrolled in <strong>{course.title}</strong> to view standard instructional reference streams and access interactive assessment evaluations.
        </p>
        <button onClick={handleDirectEnrollment} className="btn-gateway-unlock">
          Enroll Now & Unlock Content
        </button>
        <div className="gateway-footer">
          <Link to="/login" className="back-link-muted">← Return to Catalog</Link>
        </div>
      </div>
    );
  }

  const currentLesson = course.lessons?.[activeLessonIndex];
  const activeVideo = currentLesson?.video || "";
  const courseKey = `course_${course.id}`;
  
  const completedLessons = userProgress[userEmail]?.[courseKey] || [];
  const isCurrentLessonCompleted = completedLessons.includes(activeLessonIndex);

  const hasQuiz = Array.isArray(currentLesson?.quiz) && currentLesson.quiz.length > 0;
  const currentQuestion = hasQuiz ? currentLesson.quiz[currentQuestionIndex] : null;

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setQuizFeedback("⚠️ Please select an answer option before submitting!");
      return;
    }

    if (selectedOption === currentQuestion.correctAnswer) {
      if (currentQuestionIndex + 1 < currentLesson.quiz.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption("");
        setQuizFeedback(`✅ Correct! Progressing to question ${currentQuestionIndex + 2}...`);
      } else {
        const updatedProgress = { ...userProgress };

        if (!updatedProgress[userEmail]) updatedProgress[userEmail] = {};
        if (!updatedProgress[userEmail][courseKey]) updatedProgress[userEmail][courseKey] = [];

        if (!updatedProgress[userEmail][courseKey].includes(activeLessonIndex)) {
          updatedProgress[userEmail][courseKey].push(activeLessonIndex);
        }

        localStorage.setItem("userProgress", JSON.stringify(updatedProgress));
        setUserProgress(updatedProgress); 
        setSelectedOption("");
        setQuizFeedback("🎉 Outstanding! All lesson evaluation questions cleared successfully.");
      }
    } else {
      setQuizFeedback("❌ Incorrect answer. Re-evaluate the query or verify resource records and try again!");
    }
  };

  return (
    <div className="lms-page-container data-page-padding">
      <Link to="/courses" className="navigation-back-arrow">
        ← Back to All Courses
      </Link>
      
      <div className="details-header-block">
        <h1>{course.title}</h1>
        <p className="instructor-tag">Instructor: <span>{course.instructor}</span></p>
        <p className="course-description-text">{course.description}</p>
      </div>

      <div className="workspace-split-layout">
        
        {/* Left Workspace Player Column Container */}
        <div className="left-player-workspace">
          {activeVideo ? (
            <div className="video-player-wrapper">
              <iframe
                src={activeVideo}
                title="Lesson Video Player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="video-placeholder-empty">
              <p>No instructional media stream configured for this module block.</p>
            </div>
          )}

          {/* Quiz Engine Display Interface */}
          {hasQuiz ? (
            <div className={`quiz-engine-card ${isCurrentLessonCompleted ? "module-completed-bg" : ""}`}>
              <div className="quiz-card-header-bar">
                <h3>Task Check: {currentLesson.title}</h3>
                {isCurrentLessonCompleted && (
                  <span className="success-pill-badge">Module Passed ✅</span>
                )}
              </div>

              {isCurrentLessonCompleted ? (
                <p className="quiz-success-message">
                  You have successfully demonstrated comprehension for this lesson criteria. Feel free to proceed to next available chapters!
                </p>
              ) : (
                <form onSubmit={handleQuizSubmit}>
                  <p className="quiz-steps-counter">
                    Question <strong>{currentQuestionIndex + 1}</strong> of {currentLesson.quiz.length}
                  </p>
                  <p className="quiz-question-prompt">
                    {currentQuestion?.question}
                  </p>

                  <div className="radio-options-stack">
                    {currentQuestion?.options?.map((option, idx) => {
                      const isChecked = selectedOption === option;
                      return (
                        <label key={idx} className={`radio-option-row ${isChecked ? "row-selected" : ""}`}>
                          <input
                            type="radio"
                            name="lesson-quiz"
                            value={option}
                            checked={isChecked}
                            onChange={(e) => setSelectedOption(e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  <button type="submit" className="btn-submit-quiz">
                    {currentQuestionIndex + 1 === currentLesson.quiz.length ? "Submit Final Evaluation" : "Submit & Next Question"}
                  </button>
                </form>
              )}

              {quizFeedback && (
                <div className={`quiz-feedback-banner ${quizFeedback.includes("Incorrect") || quizFeedback.includes("⚠️") ? "feedback-error" : "feedback-success"}`}>
                  {quizFeedback}
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-placeholder-empty">
              💡 This introduction channel holds no structured performance evaluations.
            </div>
          )}
        </div>

        {/* Right Playlist Navigation Column Container */}
        <div className="right-playlist-sidebar">
          <h3>Course Playlist</h3>
          <ul className="playlist-list-container">
            {course.lessons?.map((lesson, index) => {
              const isActive = activeLessonIndex === index;
              const isMarkedDone = completedLessons.includes(index);
              
              return (
                <li
                  key={index}
                  onClick={() => setActiveLessonIndex(index)}
                  className={`playlist-item-row ${isActive ? "row-active" : ""}`}
                >
                  <span className="playlist-text-truncate">
                    <strong>{index + 1}.</strong> {lesson.title}
                  </span>
                  {isMarkedDone && <span className="checkmark-status-indicator">✅</span>}
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default CourseDetails;