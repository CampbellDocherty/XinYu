import styled from 'styled-components/macro';

export const Container = styled.div<{ readonly isNightTime?: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isNightTime ? 'black' : 'black')};

  & > p {
    color: ${(props) => (props.isNightTime ? 'white' : 'white')};
    margin: 48px;
  }

  & > svg {
    width: 60px;
    height: 60px;
    cursor: pointer;

    :hover {
      opacity: 90%;
    }
  }

  transition: background-color 2s ease-in;
`;

export const CityText = styled.p`
  font-size: 24px;
  opacity: 90%;
  font-weight: 600;
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

export const Lock = styled.span<{ readonly unlocked?: boolean }>`
  width: 24px;
  height: 21px;
  border: 3px solid white;
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  :after {
    content: '';
    display: block;
    background: white;
    width: 3px;
    height: 7px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -3.5px 0 0 -2px;
    -webkit-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  :before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    border: 3px solid white;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom: 0;
    -webkit-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;

    :hover {
      height: 12px;
    }

    bottom: ${(props) => (props.unlocked ? '130%' : '100%')};
    left: ${(props) => (props.unlocked ? '31%' : '50%')};
    margin-left: ${(props) => (props.unlocked ? '-11.5px' : '-8px')};
    transform: ${(props) => (props.unlocked ? 'rotate(-45deg)' : '')};
  }

  transform: ${(props) => (props.unlocked ? 'rotate(10deg)' : '')};
`;
