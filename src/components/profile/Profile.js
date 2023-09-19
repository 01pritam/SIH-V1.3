

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import ProjectList from '../projectlist/Projectlist';

function UserProfile({ authToken }) {
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '', // Store the image URL here
    githubLink: '',
    skills: '',
    description: '', // New field for user description
  });

  const [isEditing, setIsEditing] = useState(false);

  const [imagePreview, setImagePreview] = useState(''); // For displaying the image preview

  useEffect(() => {
    // Fetch user profile data when the component mounts
    axios
      .get('http://localhost:9002/user-profile', {
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Update user data with the fetched data
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [authToken]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Send updated user data to the server
    console.log(userData)
    axios
      .put('http://localhost:9002/user-profile', userData, {
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setUserData({
        ...userData,
        profilePicture: e.target.result, // Store the image data URI
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {isEditing ? (
        <div>
          <div className="profile-picture-container">
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="profilePicture" className="profile-picture-label">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="profile-picture" />
              ) : (
                <div className="default-profile">
                  <span>Click to upload</span>
                </div>
              )}
            </label>
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <label>GitHub Profile Link:</label>
          <input
            type="text"
            name="githubLink"
            value={userData.githubLink}
            onChange={handleInputChange}
          />
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={userData.skills}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={userData.description}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <div className="profile-picture-container">
            {userData.profilePicture ? (
              <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
            ) : (
              <div className="default-profile">
                <span>No Profile Picture</span>
              </div>
            )}
          </div>
          <p>Name: {userData.name}</p>
          <p>GitHub Profile Link: {userData.githubLink}</p>
          <p>Skills: {userData.skills}</p>
          <p>Description: {userData.description}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
       <ProjectList authToken={authToken} />
    </div>
  );
}

export default UserProfile;
