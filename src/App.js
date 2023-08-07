import Home from './components/Home';
import './App.css';
import {
  Container
} from 'react-bootstrap'

function App() {
  return (
    <Container fluid>
      <h1>Spotifinds</h1>
      <Home />
    </Container>
  );
}

export default App;
