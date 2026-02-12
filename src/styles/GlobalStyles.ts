import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #F5F5F5;
    color: #333;
  }

  #root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input,
  textarea {
    font-family: inherit;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Shared utility classes */
  .page-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 24px;
    text-align: center;
  }

  .icon-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: all 0.2s;
    padding: 0;
    border-radius: 6px;
  }

  .icon-button:hover {
    color: #333;
    background: #F5F5F5;
  }
`;
