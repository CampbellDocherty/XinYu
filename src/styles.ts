import styled from 'styled-components/macro';

export const Container = styled.div<{ readonly isNightTime?: boolean }>`
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

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const ConsentButton = styled.button`
  background-color: none;
  width: 50px;
  height: 25px;
  background-color: none;
  border-radius: 5px;
  cursor: pointer;
`;
