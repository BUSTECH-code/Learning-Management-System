import { useState } from "react";
import { useNavigate } from "react-router-dom";
import courseData from "../data/courses";

function InstructorDashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Form State Elements
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  
  // NEW: Quiz Generator Fields
  const [quizQuestion, setQuizQuestion] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateCourse = (e) => {
    e.preventDefault();

    // Verify all content and quiz fields are populated safely
    if (!title || !description || !lessonTitle || !videoUrl || !quizQuestion || !optA || !optB || !optC || !correctAnswer) {
      alert("Please complete all fields, including the lesson quiz settings!");
      return;
    }

    const savedCourses = localStorage.getItem("courses");
    const currentCourses = savedCourses ? JSON.parse(savedCourses) : courseData;

    const nextId = currentCourses.length > 0 
      ? Math.max(...currentCourses.map(c => c.id)) + 1 
      : 1;

    let formattedVideoUrl = videoUrl;
    if (videoUrl.includes("youtube.com/watch?v=")) {
      formattedVideoUrl = videoUrl.replace("watch?v=", "embed/");
    } else if (videoUrl.includes("youtu.be/")) {
      const videoId = videoUrl.split("/").pop();
      formattedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    // Build the dynamic course object incorporating the lesson quiz sub-schema
    const newCourse = {
      id: nextId,
      title: title,
      description: description,
      instructor: user ? user.email : "Unknown Instructor",
      enrolled: false,
      studentCount: 0,
      lessons: [
        {
          title: lessonTitle,
          video: formattedVideoUrl,
          quiz: {
            question: quizQuestion,
            options: [optA, optB, optC],
            correctAnswer: correctAnswer
          }
        }
      ]
    };

    const updatedCourses = [...currentCourses, newCourse];
    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    // Clear all inputs upon successful validation save
    setTitle("");
    setDescription("");
    setLessonTitle("");
    setVideoUrl("");
    setQuizQuestion("");
    setOptA("");
    setOptB("");
    setOptC("");
    setCorrectAnswer("");
    
    setSuccessMessage("🎉 Course with dynamic Lesson & Quiz successfully published!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Instructor Dashboard</h1>
        <button onClick={handleLogout} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <p>Welcome, <strong>{user?.email}</strong></p>
      <hr style={{ margin: "20px 0", borderColor: "#eee" }} />

      <div className="card" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9" }}>
        <h2>Create a New Course</h2>
        
        {successMessage && <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}

        <form onSubmit={handleCreateCourse} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Course Title:</label>
            <input type="text" placeholder="e.g., UI/UX Fundamentals" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Course Description:</label>
            <textarea placeholder="Provide course objectives..." value={description} onChange={(e) => setDescription(e.target.value)} rows="2" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", resize: "vertical" }} />
          </div>

          {/* Lesson Details block */}
          <fieldset style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "15px", background: "#fff" }}>
            <legend style={{ fontWeight: "bold", padding: "0 5px" }}>Lesson Configuration</legend>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "3px" }}>Lesson Title:</label>
              <input type="text" placeholder="e.g., Intro to Figma" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "3px" }}>Video URL:</label>
              <input type="text" placeholder="YouTube Link" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>
          </fieldset>

          {/* NEW: Interactive Quiz Configuration Block */}
          <fieldset style={{ border: "1px solid #007bff", borderRadius: "6px", padding: "15px", background: "#f0f7ff" }}>
            <legend style={{ fontWeight: "bold", padding: "0 5px", color: "#007bff" }}>Lesson End Quiz Questions</legend>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "3px", fontWeight: "500" }}>Quiz Question Text:</label>
              <input type="text" placeholder="What is the primary function of..." value={quizQuestion} onChange={(e) => setQuizQuestion(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px" }}>
              <label style={{ fontWeight: "500" }}>Multiple Choice Selections:</label>
              <input type="text" placeholder="Option A" value={optA} onChange={(e) => setOptA(e.target.value)} style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="text" placeholder="Option B" value={optB} onChange={(e) => setOptB(e.target.value)} style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="text" placeholder="Option C" value={optC} onChange={(e) => setOptC(e.target.value)} style={{ width: "100%", padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "3px", fontWeight: "bold", color: "#28a745" }}>Target Correct Answer:</label>
              <input type="text" placeholder="Must match one option exactly" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #28a745" }} />
            </div>
          </fieldset>

          <button type="submit" style={{ padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
            Publish Course & Lesson
          </button>
        </form>
      </div>
    </div>
  );
}

export default InstructorDashboard;