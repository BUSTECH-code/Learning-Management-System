import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import CourseCard from "../components/CourseCard";
import courseData from "../data/courses";

function Courses() {
  // Master database state
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : courseData;
  });

  // Sync with storage automatically
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // Fetch current user from localStorage to read their account role
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Control visibility state for the instructor form layout
  const [showCreator, setShowCreator] = useState(false);

  // ================= INSTRUCTOR FORM STATES =================
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");

  // Dynamic multi-question array state for teachers
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" }
  ]);

  const handleEnrollment = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, enrolled: !course.enrolled, studentCount: course.enrolled ? course.studentCount - 1 : course.studentCount + 1 }
          : course
      )
    );
  };

  // ================= DYNAMIC QUIZ BUILDER HANDLERS =================
  const handleAddQuestionField = () => {
    setQuizQuestions([
      ...quizQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" }
    ]);
  };

  const handleRemoveQuestionField = (indexToRemove) => {
    if (quizQuestions.length === 1) return; 
    setQuizQuestions(quizQuestions.filter((_, idx) => idx !== indexToRemove));
  };

  const handleQuestionTextChange = (index, value) => {
    const updated = [...quizQuestions];
    updated[index].question = value;
    setQuizQuestions(updated);
  };

  const handleOptionTextChange = (qIndex, oIndex, value) => {
    const updated = [...quizQuestions];
    updated[qIndex].options[oIndex] = value;
    setQuizQuestions(updated);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updated = [...quizQuestions];
    updated[index].correctAnswer = value;
    setQuizQuestions(updated);
  };

  // ================= SUBMIT NEW COURSE PAYLOAD =================
  const handleCreateCourse = (e) => {
    e.preventDefault();

    if (!newTitle || !newLessonTitle || !newVideoUrl) {
      alert("Please fill out the Course Title, Lesson Title, and Video Embed URL!");
      return;
    }

    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      if (!q.question.trim() || !q.correctAnswer.trim()) {
        alert(`Question ${i + 1} is missing its question prompt or its correct answer assignment.`);
        return;
      }
      if (!q.options.includes(q.correctAnswer)) {
        alert(`For Question ${i + 1}, the correct answer must perfectly match one of the listed option fields!`);
        return;
      }
    }

    const brandNewCourse = {
      id: Date.now(), 
      title: newTitle,
      description: newDescription,
      instructor: newInstructor || currentUser?.email || "Instructor",
      enrolled: false,
      studentCount: 0,
      progress: 0,
      lessons: [
        {
          title: newLessonTitle,
          video: newVideoUrl,
          quiz: [...quizQuestions] 
        }
      ]
    };

    setCourses([brandNewCourse, ...courses]);

    setNewTitle("");
    setNewDescription("");
    setNewInstructor("");
    setNewLessonTitle("");
    setNewVideoUrl("");
    setQuizQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    setShowCreator(false);
    alert("🎉 Course created successfully with a multi-question evaluation quiz!");
  };

  const totalCourses = courses.length;
  const enrolledCourses = courses.filter((course) => course.enrolled).length;
  const completedCourses = courses.filter((course) => course.progress >= 100).length;

  return (
    <div className="lms-page-container">
      {/* Metrics Counter Dashboard */}
      <Dashboard 
        totalCourses={totalCourses} 
        enrolledCourses={enrolledCourses} 
        completedCourses={completedCourses} 
      />

      {/* INSTRUCTOR CONTROL ACTION Button */}
      {currentUser?.role === "instructor" && (
        <div className="action-bar-right">
          <button
            onClick={() => setShowCreator(!showCreator)}
            className={`btn-studio-toggle ${showCreator ? "active-close" : ""}`}
          >
            {showCreator ? "✕ Close Creator Studio" : "✨ Open Course Creator Studio"}
          </button>
        </div>
      )}

      {/* CONDITIONAL INSTRUCTOR CREATION PANEL */}
      {currentUser?.role === "instructor" && showCreator && (
        <div className="instructor-desk-panel">
          <h2>🛠️ Instructor Desk: Create New Course</h2>
          
          <form onSubmit={handleCreateCourse} className="studio-form">
            <div className="form-row-twin">
              <input type="text" placeholder="Course Title (e.g., Advanced JavaScript)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="studio-input" />
              <input type="text" placeholder="Instructor Name" value={newInstructor} onChange={(e) => setNewInstructor(e.target.value)} className="studio-input" />
            </div>

            <textarea placeholder="Course Overview Description..." value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="studio-textarea" />
            
            <h3 className="sub-section-title">📚 Initial Lesson Config</h3>
            <div className="form-row-twin">
              <input type="text" placeholder="Lesson Title (e.g., Intro to Scope)" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} className="studio-input" />
              <input type="text" placeholder="Video Embed URL (YouTube embed link)" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} className="studio-input" />
            </div>

            {/* DYNAMIC QUIZ BUILDER ARRAY SECTION */}
            <h3 className="sub-section-title">📝 Assessment Quiz Creator</h3>
            
            {quizQuestions.map((qItem, qIdx) => (
              <div key={qIdx} className="quiz-creator-card">
                <div className="quiz-card-header">
                  <span className="question-number-badge">Question #{qIdx + 1}</span>
                  {quizQuestions.length > 1 && (
                    <button type="button" onClick={() => handleRemoveQuestionField(qIdx)} className="btn-remove-question">
                      ✕ Remove Question
                    </button>
                  )}
                </div>

                <input 
                  type="text" 
                  placeholder="Type the question query string here..." 
                  value={qItem.question} 
                  onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)} 
                  className="studio-input full-width-input" 
                />

                <div className="quiz-options-grid">
                  {qItem.options.map((opt, oIdx) => (
                    <input 
                      key={oIdx}
                      type="text" 
                      placeholder={`Option ${String.fromCharCode(65 + oIdx)}`} 
                      value={opt} 
                      onChange={(e) => handleOptionTextChange(qIdx, oIdx, e.target.value)} 
                      className="studio-input" 
                    />
                  ))}
                </div>

                <input 
                  type="text" 
                  placeholder="Paste the EXACT text string of the correct answer option..." 
                  value={qItem.correctAnswer} 
                  onChange={(e) => handleCorrectAnswerChange(qIdx, e.target.value)} 
                  className="studio-input correct-answer-input" 
                />
              </div>
            ))}

            <button type="button" onClick={handleAddQuestionField} className="btn-secondary-studio">
              ＋ Add Another Question
            </button>

            <button type="submit" className="btn-primary-publish">
              Publish Whole Course Package
            </button>
          </form>
        </div>
      )}

      {/* STUDENT CATALOG BOARD DISPLAY */}
      <h2 className="catalog-section-title">Available Course Catalog</h2>
      <div className="catalog-layout-grid">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            id={course.id} 
            title={course.title} 
            description={course.description} 
            instructor={course.instructor} 
            enrolled={course.enrolled} 
            progress={course.progress} 
            studentCount={course.studentCount} 
            onEnroll={() => handleEnrollment(course.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;