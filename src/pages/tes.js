  const [courseName, setCourseName] = useState('');
  const [summarize, setSummarize] = useState('');
  const [courses, setCourses] = useState([]);

  const handleAddCourse = () => {
    if (courseName.trim() !== '' && summarize.trim() !== '') {
      setCourses([
        ...courses,
        {
          name: courseName,
          summarize: summarize,
        },
      ]);

      setCourseName('');
      setSummarize('');
    } else {
      alert('Please enter both course name and summarize.');
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      <Popup
        trigger={<button>Add</button>}
        modal
        nested
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className="popup">
            {/* <button className="close" onClick={close}>
              &times;
            </button> */}
            <div className="popup_inner">
              <h2>Add Course</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </label><br></br>
              <label>
                Summarize:
                <input
                  type="text"
                  value={summarize}
                  onChange={(e) => setSummarize(e.target.value)}
                />
              </label>
              <br></br>
              <button onClick={() => { handleAddCourse(); close(); }}>Add Course</button>
              <button onClick={close}>Cancel</button>
            </div>
          </div>
        )}
      </Popup>

      <div>
        <table border="1" align="center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Summarize</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.summarize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );