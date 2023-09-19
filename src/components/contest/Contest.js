
// export default ContestPage;
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './contest.css'; // Import your CSS file with the correct filename

function ContestPage({ authToken }) {
  // State for managing contest data
  const [contests, setContests] = useState([]);
  const [newContest, setNewContest] = useState({
    title: '',
    description: '',
    projectLink: '',
    problems: [],
  });

  // State for managing the new problem text and participants
  const [newProblemText, setNewProblemText] = useState('');
  const [newProblemParticipants, setNewProblemParticipants] = useState(1); // Default participants: 1

  // Function to handle contest submission
  const submitContestData = async () => {
    try {
      // Prepare the data to send to the server
      const dataToSend = {
        title: newContest.title,
        description: newContest.description,
        projectLink: newContest.projectLink,
        problems: newContest.problems,
      };

      // Make a POST request to your server using Axios
      const response = await axios.post('http://localhost:9002/contests/create', dataToSend, {
        headers: {
            'auth-token': authToken, // Attach the authToken in the request headers if available
        },
      });

      // Handle the response (you can add code here to handle success or show a success message)
      console.log('Contest data submitted successfully:', response.data);

      // Clear the form for the next contest
      setNewContest({
        title: '',
        description: '',
        projectLink: '',
        problems: [],
      });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting contest data:', error);
    }
  };

  // Function to add a new problem to the to-do list
  const addProblem = (problemText) => {
    setNewContest({
      ...newContest,
      problems: [
        ...newContest.problems,
        {
          text: problemText,
          participants: newProblemParticipants,
        },
      ],
    });

    // Clear the new problem text field and participants after adding
    setNewProblemText('');
    setNewProblemParticipants(1);
  };

  return (
    <div className="contest-page"> {/* Add the class name here */}
      <h1>Create a New Contest</h1>
      {authToken ? (
        <div className="contest-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newContest.title}
            onChange={(e) => setNewContest({ ...newContest, title: e.target.value })}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={newContest.description}
            onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
          />
          <label htmlFor="projectLink">GitHub Project Link:</label>
          <input
            type="text"
            id="projectLink"
            value={newContest.projectLink}
            onChange={(e) => setNewContest({ ...newContest, projectLink: e.target.value })}
          />

          {/* To-Do List for adding problems */}
          <h2>Add Problems</h2>
          <div className="todo-list">
            <input
              type="text"
              placeholder="Enter a problem..."
              value={newProblemText}
              onChange={(e) => setNewProblemText(e.target.value)}
            />
            <input
              type="number"
              placeholder="Participants"
              value={newProblemParticipants}
              onChange={(e) => setNewProblemParticipants(Number(e.target.value))}
            />
            <button onClick={() => addProblem(newProblemText)}>Add Problem</button>
            <ul>
              {newContest.problems.map((problem, index) => (
                <li key={index}>
                  {problem.text} (Participants: {problem.participants})
                </li>
              ))}
            </ul>
            <button onClick={submitContestData}>Submit Contest</button> {/* Attach the submitContestData function */}
          </div>
        </div>
      ) : (
        <p>Please login to create a contest.</p>
      )}

      {/* List of submitted contests */}
      <h2>Submitted Contests</h2>
      <div className="submitted-contests">
        <ul>
          {contests.map((contest, index) => (
            <li key={index}>
              <h3>{contest.title}</h3>
              <p>{contest.description}</p>
              <p>GitHub Link: {contest.projectLink}</p>
              <ul>
                {contest.problems.map((problem, index) => (
                  <li key={index}>
                    {problem.text} (Participants: {problem.participants})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContestPage;
