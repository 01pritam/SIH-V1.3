import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './projectlist.css';
const mockProjects = [
  {
    _id: '1',
    imagePaths: ['https://tse1.mm.bing.net/th?id=OIP.1YM53mG10H_U25iPjop83QHaEo&pid=Api&P=0&h=180', 'path/to/image2.jpg'],
    title: 'Sample Project 1',
    description: 'This is a sample project description.',
    tags: ['tag1', 'tag2'],
    projectType: 'Type 1',
    link: 'https://example.com/project1',
  },
  {
    _id: '2',
    imagePaths: ['https://www.bwallpaperhd.com/wp-content/uploads/2021/01/NashPoint.jpg', 'path/to/image4.jpg'],
    title: 'Sample Project 2',
    description: 'Another sample project description.',
    tags: ['tag3', 'tag4'],
    projectType: 'Type 2',
    link: 'https://example.com/project2',
  },
  // Add more mock projects as needed
];
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
      } catch (error) {
        console.error('Error fetching user projects:', error);
       // const [projects, setProjects] = useState([mockProjects]);
       setProjects(mockProjects);

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
