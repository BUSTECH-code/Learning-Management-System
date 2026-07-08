function Dashboard({
  totalCourses,
  enrolledCourses,
  completedCourses
}) {
  // Container Widget Wrapper Styles
  const containerStyle = {
    backgroundColor: '#1e293b', // --bg-slate-800
    border: '1px solid rgba(255, 255, 255, 0.08)', // --border-rgba
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', // --shadow-lg
    maxWidth: '100%',
    margin: '0 auto 24px auto',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    color: '#f8fafc', // --text-slate-50
    fontSize: '1.5rem',
    fontWeight: '700',
    marginTop: 0,
    marginBottom: '20px',
    letterSpacing: '-0.02em',
  };

  // Stat Row Layout Engine
  const gridStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  };

  // Sub-card Stat Box Styles
  const statBoxStyle = {
    flex: '1',
    minWidth: '150px',
    backgroundColor: '#0f172a', // --bg-slate-900
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const labelStyle = {
    color: '#94a3b8', // --text-slate-400
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: 0
  };

  const numberBaseStyle = {
    fontSize: '2rem',
    fontWeight: '800',
    margin: 0,
    lineHeight: '1.2'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Dashboard Overview</h2>

      <div style={gridStyle}>
        {/* Total Courses Stat Card */}
        <div style={statBoxStyle}>
          <p style={labelStyle}>Total Courses</p>
          <p style={{ ...numberBaseStyle, color: '#e2e8f0' }}>{totalCourses}</p>
        </div>

        {/* Enrolled Courses Stat Card (Indigo Accent) */}
        <div style={statBoxStyle}>
          <p style={labelStyle}>Enrolled</p>
          <p style={{ ...numberBaseStyle, color: '#6366f1' }}>{enrolledCourses}</p>
        </div>

        {/* Completed Courses Stat Card (Emerald Accent) */}
        <div style={statBoxStyle}>
          <p style={labelStyle}>Completed</p>
          <p style={{ ...numberBaseStyle, color: '#10b981' }}>{completedCourses}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;