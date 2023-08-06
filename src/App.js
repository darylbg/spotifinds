import Search from './Search';
import './App.css';
import {
  Container
} from 'react-bootstrap'

function App() {
  return (
    <Container fluid>
      <h1>Spotifinds</h1>
      <Search />
    </Container>
  );
}

export default App;
