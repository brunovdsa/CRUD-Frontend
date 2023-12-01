import { useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';

function App() {
  const [isChecked, setIsChecked] = useState<string[]>([]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    var updateList = [...isChecked];

    if (e.target.checked) {
      updateList = [...isChecked, e.target.value];
    } else {
      updateList.splice(isChecked.indexOf(e.target.value), 1);
    }
    setIsChecked(updateList);
  };

  return (
    <div>
      <Header isChecked={isChecked} />
      <main className='table-wrapper'>
        <Table handleChecked={handleChecked} isChecked={isChecked} />
      </main>
    </div>
  );
}

export default App;
