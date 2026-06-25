import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import courseData from "../data/courses";

function CourseDetails() {
  const { id } = useParams();

  // ================= 1. AUTHENTICATION & DATABASE PARSING =================
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userEmail = user?.email || "anonymous";

  // 🛠️ Turned into true component state to support inline enrollment action updates
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    if (!savedCourses) return courseData;

    const parsed = JSON.parse(savedCourses);
    // Updated Schema Guard to also check if quiz is an array
    if (parsed[0] && parsed[0].lessons[0] && (!parsed[0].lessons[0].quiz || !Array.isArray(parsed[0].lessons[0].quiz))) {
      console.warn("Old data schema detected in localStorage. Wiping cache...");
      localStorage.removeItem("courses");
      return courseData;
    }
    return parsed;
  });

  // Automatically write course alterations (like direct enrollment triggers) into memory
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const course = courses.find((c) => c.id === Number(id));

  // Load interactive user progress states
  const [userProgress, setUserProgress] = useState(() => {
    const savedProgress = localStorage.getItem("userProgress");
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  // ================= 2. STATE MANAGEMENT =================
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 💡 New: Tracks current active question card
  const [prevId, setPrevId] = useState(id);
  const [prevLessonIndex, setPrevLessonIndex] = useState(0);

  // Quiz Form States
  const [selectedOption, setSelectedOption] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");

  // ================= 3. RENDER-PHASE SYNCHRONIZATION GUARDS =================
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

  // Handle broken/invalid routing paths gracefully
  if (!course) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Course not found</h2>
        <Link to="/courses">Return to Courses</Link>
      </div>
    );
  }

  // Handle direct secure activation from details page layout view
  const handleDirectEnrollment = () => {
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === course.id
          ? { ...c, enrolled: true, studentCount: c.studentCount + 1 }
          : c
      )
    );
  };

  // ================= 4. CONTENT ACCESSIBILITY GATEWAY =================
  if (!course.enrolled) {
    return (
      <div className="course-details-page" style={{ padding: "40px 20px", maxWidth: "600px", margin: "50px auto", textAlign: "center", border: "1px solid #ffccd5", borderRadius: "12px", background: "#fff5f5", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#d9534f", margin: "0 0 10px 0" }}>🔒 Lesson Content Locked</h2>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "25px" }}>
          You must be enrolled in <strong>{course.title}</strong> to view standard instructional reference streams and access interactive assessment evaluations.
        </p>
        <button 
          onClick={handleDirectEnrollment}
          style={{ padding: "12px 30px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
        >
          Enroll Now & Unlock Content
        </button>
        <div style={{ marginTop: "20px" }}>
          <Link to="/courses" style={{ color: "#666", textDecoration: "none" }}>← Return to Catalog</Link>
        </div>
      </div>
    );
  }

  const currentLesson = course.lessons?.[activeLessonIndex];
  const activeVideo = currentLesson?.video || "";
  const courseKey = `course_${course.id}`;
  
  // Extract completed lesson markers
  const completedLessons = userProgress[userEmail]?.[courseKey] || [];
  const isCurrentLessonCompleted = completedLessons.includes(activeLessonIndex);

  // Derive pointers for active testing set questions safely
  const hasQuiz = Array.isArray(currentLesson?.quiz) && currentLesson.quiz.length > 0;
  const currentQuestion = hasQuiz ? currentLesson.quiz[currentQuestionIndex] : null;

  // ================= 5. EVALUATION HANDLERS =================
  const handleQuizSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setQuizFeedback("⚠️ Please select an answer option before submitting!");
      return;
    }

    // Verify answer against the active targeted question structure
    if (selectedOption === currentQuestion.correctAnswer) {
      
      // Lookahead check: are there more questions left to clear inside this specific lesson list?
      if (currentQuestionIndex + 1 < currentLesson.quiz.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption("");
        setQuizFeedback(`✅ Correct! Progressing to question ${currentQuestionIndex + 2}...`);
      } else {
        // All test cards cleared successfully for this chapter block!
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
    <div className="course-details-page" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Link to="/courses" style={{ textDecoration: "none", color: "#007bff", fontWeight: "500" }}>
        ← Back to All Courses
      </Link>
      
      <div style={{ margin: "20px 0" }}>
        <h1>{course.title}</h1>
        <p>Instructor: <strong>{course.instructor}</strong></p>
        <p style={{ color: "#666", lineHeight: "1.5" }}>{course.description}</p>
      </div>

      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
        
        {/* Left Workspace Player Column Container */}
        <div style={{ flex: "2", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {activeVideo ? (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", background: "#000", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <iframe
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                src={activeVideo}
                title="Lesson Video Player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div style={{ height: "360px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
              <p>No instructional media stream configured for this module block.</p>
            </div>
          )}

          {/* Quiz Engine Display Interface */}
          {hasQuiz ? (
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", background: isCurrentLessonCompleted ? "#f1f9f5" : "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: 0, color: isCurrentLessonCompleted ? "#1e7e34" : "#333" }}>
                  Task Check: {currentLesson.title}
                </h3>
                {isCurrentLessonCompleted && (
                  <span style={{ backgroundColor: "#28a745", color: "white", padding: "4px 8px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold" }}>
                    Module Passed ✅
                  </span>
                )}
              </div>

              {isCurrentLessonCompleted ? (
                <p style={{ color: "#155724", margin: 0 }}>
                  You have successfully demonstrated comprehension for this lesson criteria. Feel free to proceed to next available chapters!
                </p>
              ) : (
                <form onSubmit={handleQuizSubmit}>
                  {/* Displays step sub-indexes (e.g. Question 1 of 2) */}
                  <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 5px 0" }}>
                    Question <strong>{currentQuestionIndex + 1}</strong> of {currentLesson.quiz.length}
                  </p>
                  <p style={{ fontWeight: "600", fontSize: "1.05rem", marginTop: 0, marginBottom: "15px" }}>
                    {currentQuestion?.question}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
                    {currentQuestion?.options?.map((option, idx) => (
                      <label key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #e0e0e0", borderRadius: "6px", cursor: "pointer", background: selectedOption === option ? "#f0f7ff" : "#fff" }}>
                        <input
                          type="radio"
                          name="lesson-quiz"
                          value={option}
                          checked={selectedOption === option}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>

                  <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
                    {currentQuestionIndex + 1 === currentLesson.quiz.length ? "Submit Final Evaluation" : "Submit & Next Question"}
                  </button>
                </form>
              )}

              {quizFeedback && (
                <div style={{ marginTop: "15px", padding: "10px", borderRadius: "4px", fontWeight: "500", backgroundColor: quizFeedback.includes("Incorrect") || quizFeedback.includes("⚠️") ? "#f8d7da" : "#d4edda", color: quizFeedback.includes("Incorrect") || quizFeedback.includes("⚠️") ? "#721c24" : "#155724" }}>
                  {quizFeedback}
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: "15px", background: "#f9f9f9", borderRadius: "8px", border: "1px dashed #ccc", textAlign: "center", color: "#666" }}>
              💡 This introduction channel holds no structured performance evaluations.
            </div>
          )}
        </div>

        {/* Right Playlist Navigation Column Container */}
        <div style={{ flex: "1", minWidth: "280px", border: "1px solid #ddd", borderRadius: "8px", padding: "15px", background: "#fafafa", height: "fit-content" }}>
          <h3 style={{ marginTop: 0, borderBottom: "1px solid #ddd", paddingBottom: "10px", color: "#333" }}>
            Course Playlist
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {course.lessons?.map((lesson, index) => {
              const isActive = activeLessonIndex === index;
              const isMarkedDone = completedLessons.includes(index);
              
              return (
                <li
                  key={index}
                  onClick={() => setActiveLessonIndex(index)}
                  style={{
                    padding: "12px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    backgroundColor: isActive ? "#007bff" : "#fff",
                    color: isActive ? "#fff" : "#000",
                    border: isActive ? "1px solid #007bff" : "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <strong>{index + 1}.</strong> {lesson.title}
                  </span>
                  {isMarkedDone && <span style={{ color: isActive ? "#fff" : "#28a745" }}>✅</span>}
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