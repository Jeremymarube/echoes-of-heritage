// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import '../app/globals.css';

// // This is the standard entry for a client-side React app
// const rootElement = document.getElementById('root');
// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }


import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);