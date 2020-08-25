import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #e1e1e6;
  }

  #keyboard {
    position: absolute;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: white;
  }
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  font-size: 20;
  color: #a1a1a1;
`;
export const TextInput = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  border: 1px solid #dadada;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px;
  margin: 10px 20px;
  border-radius: 50px;
  border: none;
  outline: none;
  color: #a1a1a1;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 300ms ease-in-out;

  &:active {
    filter: brightness(0.8);
  }
`;
