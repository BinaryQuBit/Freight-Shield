import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';

// Import to handle global theme
import Theme from './components/Theme';

// Create a root.
const root = createRoot(document.getElementById('root'));

// Initial render: Render app to root.
root.render(
  <ChakraProvider theme={Theme}>
    <App />
  </ChakraProvider>
);

<script src="https://unpkg.com/@chakra-ui/color-mode/dist/color-mode-script.min.js"></script>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

