import { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';
import { SupplierDataProps } from './interfaces/interfaces';
import { API_URL } from './services/api';
import { ModalNewSupplier } from './components/Modal/ModalNewSupplier/ModalNewSupplier';
import { ModalUpdateSupplier } from './components/Modal/ModalUpdateSupplier/ModalUpdateSupplier';
import { ModalDeleteSupplier } from './components/Modal/ModalDeleteSupplier/ModalDeleteSupplier';

function App() {
  const [checkedId, setCheckedId] = useState<number>(0);
  const [tableData, setTabelData] = useState<Array<SupplierDataProps>>();
  const [supplierData, setSupplierData] = useState<SupplierDataProps>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    tipoFornecedor: 'selecione',
    observacao: '',
    favorite: false,
  });
  const [toggleEnableButton, setToggleEnableButton] = useState<boolean>(true);
  const [modalNewSupplierIsActive, setModalNewSupplierIsActive] =
    useState<boolean>(false);
  const [modalUpdateSupplierIsActive, setModalUpdateSupplierIsActive] =
    useState(false);
  const [modalDeleteSupplierIsActive, setModalDeleteSupplierIsActive] =
    useState(false);

  //LISTA NA TABLE OS RESULTADOS DE GET
  const loadTable = async () => {
    try {
      const response = await fetch(API_URL);
      const results = await response.json();
      setTabelData(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);
  //SETA FAVORITO
  function toggleIsFavorite(id: number) {
    if (id === checkedId) {
      setCheckedId(0);
    } else {
      setCheckedId(id);
    }
    if (tableData !== undefined) {
      let firstItem: any;

      const filteredItems = tableData.filter((item) => {
        if (item.id === id) {
          firstItem = [item];
          console.log(item);
          console.log('FIRST ITEM: ', firstItem);
          return false;
        }
        return true;
      });
      setTabelData([...firstItem, ...filteredItems]);
    }
  }
  // CHECK checkedId CHECKBOX
  const handleCheckedId = (id: number) => {
    if (id === checkedId) {
      setCheckedId(0);
    } else {
      setCheckedId(id);
    }

    checkedId !== 0
      ? setToggleEnableButton(true)
      : setToggleEnableButton(false);
  };
  // MODAL NOVO FORNECEDOR
  const handleModalNewSupplier = async () => {
    setSupplierData({
      id: 0,
      nome: '',
      email: '',
      telefone: '',
      tipoFornecedor: 'selecione',
      observacao: '',
      favorite: false,
    });
    setModalNewSupplierIsActive(!modalNewSupplierIsActive);

    await loadTable();
  };
  // MODAL UPDATE FORNECEDOR
  const handleModalUpdateSupplier = async () => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const results = await response.json();
        setSupplierData(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(`${API_URL}/${checkedId}`);

    setModalUpdateSupplierIsActive(!modalUpdateSupplierIsActive);
    await loadTable();
  };
  //MODAL DELETAR FORNECEDOR
  const handleModalDeleteSupplier = async () => {
    setModalDeleteSupplierIsActive(!modalDeleteSupplierIsActive);
    await loadTable();
  };
  //CONTROLE FORM INPUTS
  const inputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setSupplierData({
      ...supplierData,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <Header
        checkedId={checkedId}
        supplierData={supplierData}
        toggleEnableButton={toggleEnableButton}
        handleModalNewSupplier={handleModalNewSupplier}
        handleModalEditSupplier={handleModalUpdateSupplier}
        handleDeleteSelectedSupplier={handleModalDeleteSupplier}
      />
      <main className='table-wrapper'>
        {tableData && (
          <Table
            tableData={tableData}
            supplierData={supplierData}
            handleCheckedId={handleCheckedId}
            toggleIsFavorite={toggleIsFavorite}
          />
        )}
        <ModalNewSupplier
          loadTable={loadTable}
          supplierData={supplierData}
          inputChanges={inputChanges}
          onClick={handleModalNewSupplier}
          modalNewSupplierIsActive={modalNewSupplierIsActive}
        />
        <ModalUpdateSupplier
          loadTable={loadTable}
          supplierData={supplierData}
          inputChanges={inputChanges}
          onClick={handleModalUpdateSupplier}
          modalUpdateSupplierIsActive={modalUpdateSupplierIsActive}
        />
        <ModalDeleteSupplier
          checkedId={checkedId}
          inputChanges={inputChanges}
          handleCheckedId={handleCheckedId}
          onClick={handleModalDeleteSupplier}
          modalDeleteSupplierIsActive={modalDeleteSupplierIsActive}
        />
      </main>
    </div>
  );
}

export default App;
