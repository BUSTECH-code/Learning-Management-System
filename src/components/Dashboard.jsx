function Dashboard({
  totalCourses,
  enrolledCourses,
  completedCourses
}) {
  return (
    <div className="card">
      <h2>Dashboard</h2>

      <p>Total Courses: {totalCourses}</p>

      <p>
        Enrolled Courses: {enrolledCourses}
      </p>

      <p>
        Completed Courses: {completedCourses}
      </p>
    </div>
  );
}

export default Dashboard;