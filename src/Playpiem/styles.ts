import styled from 'styled-components/macro';

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

export const Lock = styled.span<{ readonly isNightTime?: boolean }>`
  width: 24px;
  height: 21px;
  border: 3px solid white;
  border-radius: 5px;
  position: relative;
  transform: ${(props) => (props.isNightTime ? 'rotate(10deg)' : '')};
  opacity: ${(props) => (props.isNightTime ? '0' : '100')};
  transition: opacity 1.3s ease-out, cursor 1.3s ease-out;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;

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

    bottom: ${(props) => (props.isNightTime ? '130%' : '100%')};
    left: ${(props) => (props.isNightTime ? '31%' : '50%')};
    margin-left: ${(props) => (props.isNightTime ? '-11.5px' : '-8px')};
    transform: ${(props) => (props.isNightTime ? 'rotate(-45deg)' : '')};
  }
`;

export const IconWrapper = styled.div<{
  readonly isNightTime: boolean | undefined;
}>`
  position: relative;
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 30px;
    height: 30px;
    z-index: 10;
    cursor: ${(props) => (props.isNightTime ? 'pointer' : 'auto')};
    opacity: ${(props) => (props.isNightTime ? '100%' : '0')};
    transition: opacity 1.3s ease-in, cursor 1.3s ease-in;
    :hover {
      opacity: ${(props) => (props.isNightTime ? '90%' : '0')};
    }
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }
`;

export const PlayButton = styled.button<{
  readonly isNightTime: boolean | undefined;
}>`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 40px;
  height: 40px;
  z-index: 10;
  background-color: transparent;
  border: none;
  padding: 5px;
  border-radius: 3px;

  cursor: ${(props) => (props.isNightTime ? 'pointer' : 'auto')};
  opacity: ${(props) => (props.isNightTime ? '100%' : '0')};
  transition: opacity 1.3s ease-in, cursor 1.3s ease-in;

  :hover {
    opacity: ${(props) => (props.isNightTime ? '90%' : '0')};
  }

  :focus {
    opacity: ${(props) => (props.isNightTime ? '90%' : '0')};
    outline: 1px solid white;
    border: none;
  }

  & > svg {
    width: 100%;
    height: 100%;
  }
`;
