import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CSVLink } from 'react-csv';


// Keyframe animations
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const TableContainer = styled.div`
  width: 95%; /* Increase width */
  max-width: 1200px; /* Set a maximum width for large screens */
  margin: 0 auto; /* Center the table */
  padding: 40px; /* Increased padding for a larger container */
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 123, 255, 0.4));
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.5); /* Increased shadow */
  color: white;
  font-family: Arial, sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border: 3px solid rgba(0, 123, 255, 0.5); /* Thicker border */
  font-size: 1.1em; /* Larger font size */
`;

const TableHeader = styled.th`
  background-color: rgba(0, 123, 255, 0.5); /* Darker blue */
  color: white;
  padding: 25px 30px; /* Increased padding */
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.6em; /* Larger font size */
  cursor: pointer;
  position: relative;
  text-shadow: 0 0 10px rgba(0, 123, 255, 0.8);
  transition: all 0.4s;
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 20px rgba(0, 123, 255, 1);
  }
`;

const TableRow = styled.tr`
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease, transform 0.3s;
  animation: ${css`${fadeIn} 0.6s ease-out`}; 
  &:hover {
    background-color: rgba(0, 123, 255, 0.4);
    cursor: pointer;
    transform: scale(1.02);
  }
  &:hover td {
    opacity: 0.9;
    text-shadow: 0 0 10px rgba(0, 123, 255, 0.8);
  }
  td {
    position: relative;
  }
  td::after {
    content: attr(data-tk);
    position: absolute;
    bottom: -25px;
    left: 0;
    font-size: 0.9em;
    color: rgba(0, 123, 255, 0.8);
    display: none;
  }
  td:hover::after {
    display: block;
  }
`;

const TableCell = styled.td`
  padding: 20px 30px; /* Increased padding for a larger cell */
  color: white;
  border-bottom: 1px solid rgba(0, 123, 255, 0.2);
  text-align: center;
  font-size: 1.3em; /* Larger font size */
  padding-left: 50px; /* Added padding for clan logos */
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: rgba(0, 123, 255, 0.6);
  border: none;
  padding: 10px 20px; /* Increased padding */
  color: white;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 1.2em; /* Larger font size */
  &:disabled {
    background-color: rgba(0, 123, 255, 0.3);
    cursor: not-allowed;
  }
`;

const Dropdown = styled.select`
  padding: 5px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: rgba(0, 123, 255, 0.6);
`;

const standingsData = [
  { clanName: 'KangEsports', masterName: 'Apari🩸🩸', tk: 35, pp: 4, tp: 39 },
  { clanName: 'Alpha Wolves', masterName: '~Awe', tk: 21, pp: 10, tp: 31 },
  { clanName: 'Kingpins', masterName: 'bruisedknuckles', tk: 28, pp: 0, tp: 28 },
  { clanName: 'Vikings FRC', masterName: '~𓃵۝し么ツ', tk: 28, pp: 0, tp: 28 },
  { clanName: 'Resonance eSports', masterName: '~Dave', tk: 28, pp: 0, tp: 28 },
  { clanName: 'Deadly Divas', masterName: '~SEGZI', tk: 19, pp: 6, tp: 25 },
  { clanName: 'RogueSquadron', masterName: '~Classic', tk: 19, pp: 0, tp: 19 },
  { clanName: 'Lunar Assassins', masterName: '~𝗡𝗼𝗵𝗿𝗶𝘀', tk: 5, pp: 0, tp: 5 },
  { clanName: 'Deathlock Esport', masterName: '~Livie', tk: 5, pp: 0, tp: 5 },
  { clanName: 'Twisted Minds', masterName: 'H҉E҉R҉O҉', tk: 1, pp: 0, tp: 1 },
  { clanName: 'Sugu eSports', masterName: '~Mastermind', tk: 1, pp: 0, tp: 1 },
  { clanName: 'Toto Esports', masterName: '~✨ĶÏVØ✨', tk: 1, pp: 0, tp: 1 },
  { clanName: 'Rebels', masterName: '~Carsom 🇬🇧', tk: 0, pp: 0, tp: 0 },
  { clanName: 'Silent Shadows', masterName: 'ALǑNĚ', tk: 0, pp: 0, tp: 0 },
  { clanName: 'Seven I Esports', masterName: '~Big • Dolly ऻ', tk: 0, pp: 0, tp: 0 },
  { clanName: 'Spartan liar', masterName: '~BIG FEMS🦅🖤', tk: 0, pp: 0, tp: 0 },
  { clanName: 'TheOnlyKlan', masterName: '~.', tk: 0, pp: 0, tp: 0 },
  { clanName: 'Bold flames', masterName: '~🥀____MaŇueŁ', tk: 0, pp: 0, tp: 0 },
  { clanName: 'X- raider’s', masterName: '~xo', tk: 0, pp: 0, tp: 0 },
  { clanName: 'Angel’s eyes', masterName: '~𝔄𝔈༒︎𝓜𝓞𝓖', tk: 0, pp: 0, tp: 0 },
  { clanName: 'Anonymous esport', masterName: 'VICTOR-TK', tk: 0, pp: 0, tp: 0 },
];

const StandingsTable = () => {
  const [sortBy, setSortBy] = useState('tp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedClan, setSelectedClan] = useState('');
  const totalPages = Math.ceil(standingsData.length / itemsPerPage);

  const handleSort = (key) => {
    const newOrder = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(key);
    setSortOrder(newOrder);
  };

  const sortedData = [...standingsData].sort((a, b) => {
    if (sortBy === 'tp') {
      return sortOrder === 'asc' ? a.tp - b.tp : b.tp - a.tp;
    } else if (sortBy === 'tk') {
      return sortOrder === 'asc' ? a.tk - b.tk : b.tk - a.tk;
    } else if (sortBy === 'pp') {
      return sortOrder === 'asc' ? a.pp - b.pp : b.pp - a.pp;
    } else if (sortBy === 'clanName') {
      return sortOrder === 'asc'
        ? a.clanName.localeCompare(b.clanName)
        : b.clanName.localeCompare(a.clanName);
    } else if (sortBy === 'masterName') {
      return sortOrder === 'asc'
        ? a.masterName.localeCompare(b.masterName)
        : b.masterName.localeCompare(a.masterName);
    }
    return 0;
  });

  const handleClanFilterChange = (e) => {
    setSelectedClan(e.target.value);
  };

  const filteredData = sortedData.filter((entry) =>
    entry.clanName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedClan ? entry.clan === selectedClan : true)
  );

  const resetFilters = () => {
    setSortBy('clanName');
    setSortOrder('asc');
    setSearchQuery('');
    setCurrentPage(1);
    setItemsPerPage(5);
    setSelectedClan('');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1>CMA Scrims</h1>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
        <Button onClick={resetFilters}>Reset Filters</Button>
        <CSVLink data={filteredData} filename="standings.csv">
          <Button>Export to CSV</Button>
        </CSVLink>
      </SearchContainer>

      <Dropdown onChange={handleClanFilterChange}>
        <option value="">All Clans</option>
        {Array.from(new Set(standingsData.map((item) => item.clan))).map((clan, index) => (
          <option key={index} value={clan}>{clan}</option>
        ))}
      </Dropdown>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader onClick={() => handleSort('masterName')}>Clan Master</TableHeader>
              <TableHeader onClick={() => handleSort('clanName')}>Clan Name</TableHeader>
              <TableHeader onClick={() => handleSort('tk')}>TK</TableHeader>
              <TableHeader onClick={() => handleSort('pp')}>PP</TableHeader>
              <TableHeader onClick={() => handleSort('tp')}>TP</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <TableRow key={index}>
                <TableCell data-tk={`Clan Master: ${entry.masterName}`}>{entry.masterName}</TableCell>
                <TableCell data-tk={`TK: ${entry.tk}`}>{entry.clanName}</TableCell>
                <TableCell data-tk={`TK: ${entry.tk}`}>{entry.tk}</TableCell>
                <TableCell data-tk={`PP: ${entry.pp}`}>{entry.pp}</TableCell>
                <TableCell data-tk={`TP: ${entry.tp}`}>{entry.tp}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <Button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span>{currentPage}</span>
        <Button
          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <Button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>

        <Dropdown onChange={(e) => setItemsPerPage(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Dropdown>
      </PaginationContainer>
    </div>
  );
};

export default StandingsTable;