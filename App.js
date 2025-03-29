import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import StandingsTable from './standingsTable';
import teamsData from './data/teamData';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Background Animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideshowFade = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0d0d0d;
  min-height: 100vh;
  animation: ${fadeIn} 1.5s ease-in-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0;
    animation: ${slideshowFade} 15s infinite;
    background-image: url('/assets/bg1.jpg');
  }
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  color: #FFD700; /* CODM-themed gold color */
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  color: #cccccc;
  margin-bottom: 30px;
  text-align: center;
`;

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/assets/bg1.jpg', '/assets/bg2.jpg', '/assets/bg3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <AppContainer style={{ backgroundImage: `url(${images[currentImage]})` }}>
      <Heading>CMA Scrims</Heading>
      <SubHeading>Battle Royale Slots</SubHeading>
      <StandingsTable data={teamsData} />
    </AppContainer>
  );
}

export default App;