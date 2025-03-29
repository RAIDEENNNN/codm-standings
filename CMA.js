import styled from 'styled-components';

const PageContainer = styled.div`
  background-image: url('/background.jpg'); /* Ensure the image is in /public */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white; /* Make sure text is readable */
`;

const CMA = () => {
  return (
    <PageContainer>
      <h1>CMA Scrims</h1>
      <p>Battle Royale Slots</p>
      {/* Keep your existing table and other elements here */}
    </PageContainer>
  );
};

export default CMA;