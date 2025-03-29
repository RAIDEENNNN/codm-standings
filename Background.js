import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(255, 215, 0, 0.5));
  }
  50% {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.5), rgba(0, 0, 0, 0.7));
  }
z    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(255, 215, 0, 0.5));
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const SlideshowContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2; /* Lowered z-index to be behind all content */
  background: url(${(props) => props.slides[props.currentSlide]}) no-repeat center center;
  background-size: cover;
  backdrop-filter: blur(5px); /* Dynamic Blur Effect */
  animation: ${gradientAnimation} 20s infinite alternate;
`;

const ParticleOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url('/assets/particles.png'); /* Add a transparent particles image here */
  background-size: cover;
  opacity: 0.2; /* Adjust for desired intensity */
  z-index: -1;
`;

const SlideshowWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Slide = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: absolute;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 1s ease;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;
  color: white;

  &:hover {
    background-color: rgba(255, 215, 0, 0.7);
  }
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.active ? 'rgba(255, 215, 0, 1)' : 'rgba(255, 255, 255, 0.5)')};
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const slides = [
  '/assets/codm1.jpg',
  '/assets/codm2.jpg',
  '/assets/codm3.jpg',
  '/assets/codm4.jpg',
  '/assets/codm5.jpg',
];

const CarouselSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length;
  const autoPlayInterval = 5000; // 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? slideCount - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === slideCount - 1 ? 0 : currentSlide + 1);
  };

  return (
    <SlideshowContainer slides={slides} currentSlide={currentSlide}>
      <ParticleOverlay /> {/* Particle Effect Layer */}
      <SlideshowWrapper>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            style={{ backgroundImage: `url(${slide})` }}
            active={index === currentSlide}
          />
        ))}

        <Arrow style={{ left: '10px' }} onClick={handlePrev}>❮</Arrow>
        <Arrow style={{ right: '10px' }} onClick={handleNext}>❯</Arrow>

        <DotsWrapper>
          {slides.map((_, index) => (
            <Dot
              key={index}
              active={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </DotsWrapper>
      </SlideshowWrapper>
    </SlideshowContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 128, 0.7); /* Blue background */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 255, 0.5);
  transition: background-color 0.5s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 0; /* Adjusted z-index to be above the slideshow background */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border: 2px solid rgba(255, 215, 0, 0.3);
`;

const TableHeader = styled.th`
  background-color: rgba(255, 215, 0, 0.3);
  color: white;
  padding: 12px 15px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
`;

const TableRow = styled.tr`
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  &:hover {
    background-color: rgba(255, 215, 0, 0.4);
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  color: white;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  text-align: center;
`;

const standingsData = [
  { rank: 1, player: 'Player One', score: 3500 },
  { rank: 2, player: 'Player Two', score: 3200 },
  { rank: 3, player: 'Player Three', score: 3000 },
  { rank: 4, player: 'Player Four', score: 2800 },
  { rank: 5, player: 'Player Five', score: 2700 },
];

const StandingsTable = () => {
  const [sortBy, setSortBy] = useState("rank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [rankRange, setRankRange] = useState([1, 10]);
  const [scoreRange, setScoreRange] = useState([0, 5000]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSort = (key) => {
    const newOrder = sortBy === key && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortOrder(newOrder);
  };

  const sortedData = [...standingsData].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const filteredData = sortedData.filter((entry) =>
    entry.rank >= rankRange[0] && entry.rank <= rankRange[1] &&
    entry.score >= scoreRange[0] && entry.score <= scoreRange[1] &&
    entry.player.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#121212" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("CMA Scrims", 10, 10);
    filteredData.forEach((entry, index) => {
      doc.text(`${entry.rank}. ${entry.player} - ${entry.score}`, 10, 20 + index * 10);
    });
    doc.save("CMA Scrims.pdf");
  };

  return (
    <>
      <CarouselSlideshow />
      <TableContainer style={themeStyles}>
        <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <input
          type="text"
          placeholder="Search by Player"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "100%",
            fontSize: "1.1em",
          }}
        />
        <input
          type="number"
          placeholder="Min Rank"
          value={rankRange[0]}
          onChange={(e) => setRankRange([Number(e.target.value), rankRange[1]])}
        />
        <input
          type="number"
          placeholder="Max Rank"
          value={rankRange[1]}
          onChange={(e) => setRankRange([rankRange[0], Number(e.target.value)])}
        />
        <input
          type="number"
          placeholder="Min Score"
          value={scoreRange[0]}
          onChange={(e) => setScoreRange([Number(e.target.value), scoreRange[1]])}
        />
        <input
          type="number"
          placeholder="Max Score"
          value={scoreRange[1]}
          onChange={(e) => setScoreRange([scoreRange[0], Number(e.target.value)])}
        />
        <Table>
          <thead>
            <tr>
              <TableHeader onClick={() => handleSort("rank")}>Rank</TableHeader>
              <TableHeader onClick={() => handleSort("player")}>Player</TableHeader>
              <TableHeader onClick={() => handleSort("score")}>Score</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>{entry.player}</TableCell>
                <TableCell>{entry.score}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <CSVLink data={filteredData} filename="cma-scrims.csv">
            <button>Export to CSV</button>
          </CSVLink>
          <button onClick={exportToPdf}>Export to PDF</button>
        </div>
      </TableContainer>
    </>
  );
};

export default StandingsTable;