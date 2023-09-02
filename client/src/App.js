import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './pages/MainContent';
import { DrinkProvider } from './utils/DrinkContext';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './utils/AuthContext';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <DrinkProvider>
            <MainContent />
          </DrinkProvider>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
