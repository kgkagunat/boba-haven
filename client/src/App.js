import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './pages/MainContent';
import { DrinkProvider } from './utils/DrinkContext';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your GraphQL API
const httpLink = createHttpLink({
  uri: 'YOUR_GRAPHQL_API_ENDPOINT', // Replace with your GraphQL API endpoint
});

// Create auth link which adds the JWT token to every request (if it exists)
const authLink = setContext((_, { headers }) => {
  // Get the JWT token from local storage
  const token = localStorage.getItem('jwt');
  
  // Return headers with the authorization (or without if no token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Initialize Apollo Client with the concatenated auth and HTTP links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
