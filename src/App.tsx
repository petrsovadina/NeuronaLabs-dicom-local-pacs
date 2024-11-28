import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientList } from './components/PatientList';
import { PatientDetail } from './components/PatientDetail';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
