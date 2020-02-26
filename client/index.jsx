import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const expId = parseInt(window.location.href.split('/').slice(-1)[0], 10) || 1;

ReactDOM.render(<App expId={expId} />, document.getElementById('calendar'));
