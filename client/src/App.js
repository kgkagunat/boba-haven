// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './pages/MainContent';
import { DrinkProvider } from './utils/DrinkContext';

function App() {
  return (
    <Router>
      <DrinkProvider>
        <MainContent />
      </DrinkProvider>
    </Router>
  );
}

export default App;
