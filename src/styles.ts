import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;

  & > p {
    color: white;
    margin: 40px;
  }

  transition: background-color 2s ease-in;
`;
