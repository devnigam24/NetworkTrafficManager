import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './views/app/App';
import reportWebVitals from './reportWebVitals';

window.onerror = function(message, source, lineno, colno, error) {
  console.error({message, source, lineno, colno, error});
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
