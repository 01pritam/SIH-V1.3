import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = ({ authToken }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch user projects when the component mounts
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9002/projects', {
          headers: {
            'auth-token': authToken, // Send the authentication token in the headers
          },
        });
        setProjects(response.data);
        // setProjects(profile1.json)
        
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    fetchUserProjects();
  }, [authToken]);

  return (
    <div>
      <h2>Your Projects</h2>
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          {project.imagePaths.map((imagePath, index) => (
            <img
              key={index}
              src={imagePath}
              alt={`Project ${index}`}
              className="project-image"
            />
          ))}
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>{project.tags}</p>
          <p>{project.projectType}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
