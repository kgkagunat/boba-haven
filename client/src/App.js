// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './pages/MainContent'; // Adjust the path accordingly

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
