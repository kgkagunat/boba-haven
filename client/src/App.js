// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './pages/MainContent';
import { DrinkProvider } from './utils/DrinkContext';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_API_ENDPOINT', // Replace URI with our GraphQL API endpoint once available
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <DrinkProvider>
          <MainContent />
        </DrinkProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
