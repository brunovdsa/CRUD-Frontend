import './App.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';

function App() {
  return (
    <div>
      <Header />
      <main className='table-wrapper'>
        <Table />
      </main>
    </div>
  );
}

export default App;
