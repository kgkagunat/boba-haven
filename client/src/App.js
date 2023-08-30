// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './pages/MainContent';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
