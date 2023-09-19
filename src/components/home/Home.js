
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css'; // Make sure to import your CSS file

function Home() {
  const [trendingProjects, setTrendingProjects] = useState([]);

  useEffect(() => {
    // Fetch trending projects using Axios when the component mounts
    axios.get('http://localhost:9002/trending-projects') // Replace with your API endpoint
      .then((response) => {
        setTrendingProjects(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trending projects:', error);
      });
  }, []);

  return (
    <div className="myCarousel">
      <h1>Trending Projects</h1>
      <Carousel
        showThumbs={false}
        showStatus={false}
        width="800px"
        height="3000px"
      >
        {trendingProjects.map((project) => (
          <div key={project._id} className="carousel-slide">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <img
              src={project.imageUrl || 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}
              alt={project.title}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
