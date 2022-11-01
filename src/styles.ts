import styled from 'styled-components/macro';

export const Container = styled.div<{ readonly isNightTime: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isNightTime ? 'black' : 'white')};

  & > p {
    color: ${(props) => (props.isNightTime ? 'white' : 'black')};
  }

  transition: background-color 2s ease-in;
`;

export const LocationConsentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
