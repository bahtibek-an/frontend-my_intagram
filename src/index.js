import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';

const styles = {
  global:(props) => ({
    body:{
      bg:mode("gray.100","#000")(props),
      color:mode("gray.800","whiteAlpha.900")(props),
    },  
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};



// 3. extend the theme
const theme = extendTheme({ config, styles });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </BrowserRouter>
     </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
