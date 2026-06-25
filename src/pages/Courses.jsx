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

  // 💡 1. Fetch current user from localStorage to read their account role
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 💡 2. Control visibility state for the instructor form layout
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

    // Reset Form Fields completely and collapse form panel
    setNewTitle("");
    setNewDescription("");
    setNewInstructor("");
    setNewLessonTitle("");
    setNewVideoUrl("");
    setQuizQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    setShowCreator(false);
    alert("🎉 Course created successfully with a multi-question evaluation quiz!");
  };

  // Computed dashboard totals
  const totalCourses = courses.length;
  const enrolledCourses = courses.filter((course) => course.enrolled).length;
  const completedCourses = courses.filter((course) => course.progress >= 100).length;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Metrics Counter Dashboard */}
      <Dashboard 
        totalCourses={totalCourses} 
        enrolledCourses={enrolledCourses} 
        completedCourses={completedCourses} 
      />

      {/* 💡 INSTRUCTOR CONTROL ACTION (Only visible to Instructor accounts) */}
      {currentUser?.role === "instructor" && (
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setShowCreator(!showCreator)}
            style={{
              padding: "12px 24px",
              backgroundColor: showCreator ? "#6c757d" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            {showCreator ? "✕ Close Course Creator" : "✨ Open Course Creator Studio"}
          </button>
        </div>
      )}

      {/* --- CONDITIONAL INSTRUCTOR CREATION CONTROL DESK --- */}
      {currentUser?.role === "instructor" && showCreator && (
        <div style={{ background: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: "8px", padding: "25px", margin: "20px 0" }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>🛠️ Instructor Desk: Create New Course</h2>
          
          <form onSubmit={handleCreateCourse} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <input type="text" placeholder="Course Title (e.g., Advanced JavaScript)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="text" placeholder="Instructor Name" value={newInstructor} onChange={(e) => setNewInstructor(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            <textarea placeholder="Course Overview Description..." value={newDescription} onChange={(e) => setNewDescription(e.target.value)} style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "60px" }} />
            
            <h3 style={{ margin: "10px 0 5px 0", color: "#495057" }}>📚 Initial Lesson Config</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <input type="text" placeholder="Lesson Title (e.g., Intro to Scope)" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="text" placeholder="Video Embed URL (YouTube embed link)" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            {/* DYNAMIC QUIZ BUILDER ARRAY SECTION */}
            <h3 style={{ margin: "15px 0 5px 0", color: "#495057" }}>📝 Assessment Quiz Creator</h3>
            
            {quizQuestions.map((qItem, qIdx) => (
              <div key={qIdx} style={{ padding: "15px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", color: "#007bff" }}>Question #{qIdx + 1}</span>
                  {quizQuestions.length > 1 && (
                    <button type="button" onClick={() => handleRemoveQuestionField(qIdx)} style={{ background: "none", border: "none", color: "#dc3545", cursor: "pointer", fontWeight: "bold" }}>
                      ✕ Remove Question
                    </button>
                  )}
                </div>

                <input 
                  type="text" 
                  placeholder="Type the question query string here..." 
                  value={qItem.question} 
                  onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)} 
                  style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} 
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                  {qItem.options.map((opt, oIdx) => (
                    <input 
                      key={oIdx}
                      type="text" 
                      placeholder={`Option ${String.fromCharCode(65 + oIdx)}`} 
                      value={opt} 
                      onChange={(e) => handleOptionTextChange(qIdx, oIdx, e.target.value)} 
                      style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }} 
                    />
                  ))}
                </div>

                <input 
                  type="text" 
                  placeholder="Paste the EXACT text string of the correct answer option..." 
                  value={qItem.correctAnswer} 
                  onChange={(e) => handleCorrectAnswerChange(qIdx, e.target.value)} 
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ffccd5", background: "#fffefe", boxSizing: "border-box" }} 
                />
              </div>
            ))}

            <button 
              type="button" 
              onClick={handleAddQuestionField} 
              style={{ width: "fit-content", alignSelf: "flex-start", padding: "8px 16px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "500" }}
            >
              ＋ Add Another Question
            </button>

            <button type="submit" style={{ padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", marginTop: "10px" }}>
              Publish Whole Course Package
            </button>
          </form>
        </div>
      )}

      {/* --- STUDENT CATALOG BOARD DISPLAY --- */}
      <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", color: "#333", marginTop: "30px" }}>Available Course Catalog</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
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