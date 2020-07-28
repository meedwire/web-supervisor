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
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  font-size: 20;
`;
export const TextInput = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  border: 1px solid #dadada;
  outline: none;
`;

export const Button = styled.button``;
