import styled from 'styled-components/macro';

export const Container = styled.div<{ readonly isNightTime?: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isNightTime ? 'black' : 'white')};

  & > p {
    color: ${(props) => (props.isNightTime ? 'white' : 'black')};
  }

  transition: background-color 2s ease-in;
`;

export const Disclaimer = styled.p`
  font-size: 12px;
  opacity: 80%;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;
