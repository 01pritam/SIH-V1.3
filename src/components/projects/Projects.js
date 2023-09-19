import React, { useState, useEffect } from 'react';
import './projects.css';
import axios from 'axios';
import ProjectList from '../projectlist/Projectlist';

const Projects = () => {
  const initialProjectData = {
    title: '',
    description: '',
    imageUrls: [],
    tags: '',
    link: '',
    projectType: '',
  };

  const [projectsData, setProjectsData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProject, setNewProject] = useState(initialProjectData);

  // Add state for authentication token
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    // Fetch the authentication token from wherever you store it (localStorage, cookies, etc.)
    const token = localStorage.getItem('jwtToken'); // Change this as per your storage method

    if (token) {
      setAuthToken(token);
    }
  }, []);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio' && name === 'projectType') {
      setNewProject({
        ...newProject,
        [name]: value,
      });
    } else {
      if (name === 'tags') {
        const tagsValue = value.replace(/ /g, ' #');

        if (tagsValue.startsWith('# ')) {
          setNewProject({
            ...newProject,
            [name]: tagsValue.substring(2),
          });
        } else {
          setNewProject({
            ...newProject,
            [name]: tagsValue,
          });
        }
      } else {
        setNewProject({
          ...newProject,
          [name]: value,
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);

    setNewProject({
      ...newProject,
      imageUrls: [],
      imageFiles,
    });
  };

  const sendDataToServer = async (formData) => {
    try {
      const response = await axios.post('http://localhost:9002/projects', formData, {
        headers: {
          'auth-token': authToken, // Send the authentication token in the headers
        },
      });

      //console.log('Project saved:', response.data);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    formData.append('tags', newProject.tags);
    formData.append('projectType', newProject.projectType);
    formData.append('link', newProject.link);

    for (const file of newProject.imageFiles) {
      formData.append('images', file);
    }

    await sendDataToServer(formData);

    const projectWithImages = {
      ...newProject,
      imageUrls: newProject.imageFiles.map((file) => URL.createObjectURL(file)),
    };

    setProjectsData([...projectsData, projectWithImages]);
    setNewProject(initialProjectData);
    toggleForm();
  };

  return (
    <div className="projects-container">
      <h2>Explore User-Submitted Projects</h2>
      <button onClick={toggleForm} className="add-project-button">
        Add Project
      </button>

      {isFormVisible && (
        <div className="project-form">
          <h3>Add Your Project</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newProject.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProject.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              value={newProject.tags}
              onChange={handleInputChange}
              required
            />
            <div className="project-type">
              <label>Project Type:</label>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="School"
                  onChange={handleInputChange}
                  checked={newProject.projectType === 'School'}
                />
                School
              </label>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="College"
                  onChange={handleInputChange}
                  checked={newProject.projectType === 'College'}
                />
                College
              </label>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="Others"
                  onChange={handleInputChange}
                  checked={newProject.projectType === 'Others'}
                />
                Others
              </label>
            </div>
            <input
              type="url"
              name="link"
              placeholder="Project Link"
              value={newProject.link}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* <div className="project-list">
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            {project.imageUrls.map((imageUrl, imgIndex) => (
              <img src={imageUrl} alt={`${project.title}-image-${imgIndex}`} key={imgIndex} />
            ))}
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.tags}</p>
              <p>{project.projectType}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div> */}
      <ProjectList authToken={authToken} />
    </div>
  );
};

export default Projects;
