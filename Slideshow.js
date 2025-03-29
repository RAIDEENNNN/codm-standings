import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import './slideshow.css'; // Make sure this file exists or remove this line

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 15px #00f, 0 0 20px #00f; }
  50% { text-shadow: 0 0 10px #00f, 0 0 20px #00f, 0 0 30px #00f, 0 0 40px #00f; }
  100% { text-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 15px #00f, 0 0 20px; }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(45deg, #001f3f, #0074D9, #001f3f);
  background-size: 400% 400%;
  animation: gradientMove 10s ease infinite;
  z-index: -1;

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const SlideContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1.5s ease;
`;

const ClanName = styled.h3`
  color: #00f;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  animation: ${glow} 3s infinite alternate;
`;

const Slideshow = () => {
  const clans = [
    { name: 'KangEsports', leader: 'bruisedknuckles' },
    { name: 'Alpha Wolves', leader: 'Classic' },
    { name: 'Kingpins', leader: 'H҉E҉R҉O҉' },
    { name: 'Vikings FRC', leader: 'Carsom 🇬🇧' },
    { name: 'Resonance eSports', leader: 'Awe' },
    { name: 'Deadly Divas', leader: '𝗡𝗼𝗵𝗿𝗶𝘀' },
    { name: 'RogueSquadron', leader: 'ALǑNĚ' },
    { name: 'Lunar Assassins', leader: '𓃵۝し么ツ' },
    { name: 'Deathlock Esport', leader: 'SEGZI' },
    { name: 'Twisted Minds', leader: 'Dave' },
    { name: 'Sugu eSports', leader: 'Livie' },
    { name: 'Toto Esports', leader: 'Big • Dolly ऻ' },
    { name: 'Rebels', leader: 'Mastermind' },
    { name: 'Silent Shadows', leader: 'Apari🩸🩸' },
    { name: 'Seven I Esports', leader: '✨ĶÏVØ✨' },
    { name: 'Spartan liar', leader: 'BIG FEMS🦅🖤' },
    { name: 'TheOnlyKlan', leader: 'alliy' },
    { name: 'Bold flames', leader: 'MaŇueŁ' },
    { name: 'X-raider’s', leader: 'alliy' },
    { name: 'Angel’s eyes', leader: 'alliy' },
    { name: 'Anonymous esport', leader: 'VICTOR-TK' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
  };

  return (
    <>
      <Background /> {/* Background Gradient Cover */}
      <Slider {...settings}>
        {clans.map((clan, index) => (
          <SlideContainer key={index}>
            <ClanName>{`${clan.leader} - ${clan.name}`}</ClanName>
          </SlideContainer>
        ))}
      </Slider>
    </>
  );
};

export default Slideshow;
