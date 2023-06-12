import React, { useState, useEffect } from "react";
import data from "./data";
import List from "./List";
import Alarm from "./Alarm";

function App() {
  const [people, setPeople] = useState(data);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const storedIssues = JSON.parse(localStorage.getItem("issues"));
    if (storedIssues) {
      setIssues(storedIssues);
    }
  }, []);

  const submitIssue = (e) => {
    e.preventDefault();
    const description = e.target.issueDescription.value;
    const severity = e.target.issueSeverity.value;
    const assignedTo = e.target.issueAssignedTo.value;
    const id = Math.floor(Math.random() * 100000000) + "";
    const status = "Open";

    if (description.length === 0 || assignedTo.length === 0) {
      alert("Please fill all fields with required data.");
      return;
    }

    const issue = { id, description, severity, assignedTo, status };
    const updatedIssues = [...issues, issue];
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));

    e.target.reset();
  };

  const closeIssue = (id) => {
    const updatedIssues = issues.map((issue) => {
      if (issue.id === id) {
        return {
          ...issue,
          status: "Closed",
          description: `<strike>${issue.description}</strike>`,
        };
      }
      return issue;
    });

    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
  };

  const deleteIssue = (id) => {
    const updatedIssues = issues.filter((issue) => issue.id !== id);
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="header-title">AgeWell Dashboard</h1>
      </div>
      <div className="header-card">
        <div className="health-card">
          <h4>Health Information</h4>
          <ul>
            <li>
              <strong>Age:</strong> 68 years
            </li>
            <li>
              <strong>Height:</strong> 5'5" (165 cm)
            </li>
            <li>
              <strong>Weight:</strong> 150 lbs (68 kg)
            </li>
            <li>
              <strong>Blood Pressure:</strong> Normal
            </li>
            <li>
              <strong>Heart Rate:</strong> Average resting heart rate of 75 bpm
            </li>
            <li>
              <strong>Exercise Preferences:</strong> Walking, gentle yoga, and
              swimming
            </li>
            <li>
              <strong>Health Conditions:</strong> Osteoarthritis (knee pain),
              mild hypertension
            </li>
          </ul>
        </div>
      </div>
      <main>
        <div className="section-container">
          <section className="container">
            <h3>Today's medicines: {people.length} no.</h3>
            <List people={people} />
            <button onClick={() => setPeople([])}>Clear All</button>
          </section>

          <div className="section-space"></div>

          <section className="container">
            <h3>Issue Tracker</h3>
            <form onSubmit={submitIssue}>
              <div className="form-group">
                <label htmlFor="issueDescription">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="issueDescription"
                  required
                  placeholder="Enter issue description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="issueSeverity">Severity</label>
                <select className="form-control" id="issueSeverity" required>
                  <option value="">Select severity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="issueAssignedTo">Assigned To</label>
                <input
                  type="text"
                  className="form-control"
                  id="issueAssignedTo"
                  required
                  placeholder="Enter assignee"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Issue
              </button>
            </form>
            <div id="issuesList">
              {issues.map((issue) => (
                <div className="well" key={issue.id}>
                  <h6>Issue ID: {issue.id}</h6>
                  <p>
                    <span className="label label-info">{issue.status}</span>
                  </p>
                  <h3
                    dangerouslySetInnerHTML={{ __html: issue.description }}
                  ></h3>
                  <p>
                    <span className="glyphicon glyphicon-time"></span>{" "}
                    {issue.severity}
                  </p>
                  <p>
                    <span className="glyphicon glyphicon-user"></span>{" "}
                    {issue.assignedTo}
                  </p>
                  <button
                    onClick={() => closeIssue(issue.id)}
                    className="btn btn-warning"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => deleteIssue(issue.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="section-space"></div>

          <Alarm />
        </div>
      </main>
    </div>
  );
}

export default App;
