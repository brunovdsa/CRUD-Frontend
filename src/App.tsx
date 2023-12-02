import { useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';

function App() {
  const [chekedId, setCheckedId] = useState<string[]>([]);
  const [toggleEnableButton, setToggleEnableButton] = useState<boolean>(true);

  const handleCheckedId = (e: React.ChangeEvent<HTMLInputElement>) => {
    var updateList = [...chekedId];

    if (e.target.checked) {
      updateList = [...chekedId, e.target.value];
    } else {
      updateList.splice(chekedId.indexOf(e.target.value), 1);
    }
    setCheckedId(updateList);

    chekedId.length >= 1
      ? setToggleEnableButton(true)
      : setToggleEnableButton(false);
  };

  return (
    <div>
      <Header checkedId={chekedId} toggleEnableButton={toggleEnableButton} />
      <main className='table-wrapper'>
        <Table handleChecked={handleCheckedId} isChecked={chekedId} />
      </main>
    </div>
  );
}

export default App;
