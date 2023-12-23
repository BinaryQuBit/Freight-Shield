import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import Theme from './components/Theme'

ReactDOM.render(
  <ChakraProvider theme ={Theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
<script src="https://unpkg.com/@chakra-ui/color-mode/dist/color-mode-script.min.js"></script>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
