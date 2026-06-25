import { Link } from "react-router-dom";

function CourseCard(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <h3>{props.instructor}</h3>

      <p>
         Status: {props.enrolled ? 'Enrolled' : 'Not Enrolled'}
      </p>

      <p>
        Progress: {props.progress}%
      </p>

      {props.progress < 100 && (
        <button onClick={props.onProgress}>
          Complete Lesson
        </button>
      )}

      {props.progress === 100 && <p>✓ Course Completed</p>}

      {/* 🔒 Made enrollment non-reversible and styled to visually indicate a locked action */}
      <button 
        onClick={props.onEnroll} 
        disabled={props.enrolled}
        style={{ 
          cursor: props.enrolled ? "not-allowed" : "pointer",
          opacity: props.enrolled ? 0.65 : 1,
          marginRight: "5px"
        }}
      >
        {props.enrolled ? "Enrolled ✓" : "Enroll"}
      </button>

      <Link to={`/courses/${props.id}`}>
        <button>
          View Course
        </button>
      </Link>

      <p>
        Students Enrolled: {props.studentCount}
      </p>
    </div>
  );
}

export default CourseCard;