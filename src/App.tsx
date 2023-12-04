import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';
import { SupplierDataProps } from './interfaces/interfaces';
import { API_URL } from './services/api';
import { ModalNewSupplier } from './components/Modal/ModalNewSupplier/ModalNewSupplier';
import { ModalUpdateSupplier } from './components/Modal/UpdateNewSupplier/ModalUpdateSupplier';
import { ModalDeleteSupplier } from './components/Modal/DeleteSupplier/ModalDeleteSupplier';

function App() {
  const [checkedId, setCheckedId] = useState<string[]>([]);
  const [tableData, setTabelData] = useState<Array<SupplierDataProps>>();
  const [supplierData, setSupplierData] = useState<SupplierDataProps>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    tipoFornecedor: 'selecione',
    observacao: '',
  });
  const [toggleEnableButton, setToggleEnableButton] = useState<boolean>(true);
  const [modalNewSupplierIsActive, setModalNewSupplierIsActive] =
    useState<boolean>(false);
  const [modalUpdateClientIsActive, setModalUpdateClientIsActive] =
    useState(false);
  const [modalDeleteClienteIsActive, setModalDeleteClienteIsActive] =
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

  // CHECK ID CHECKBOX
  const handleCheckedId = (e: React.ChangeEvent<HTMLInputElement>) => {
    var updateList = [...checkedId];

    if (e.target.checked) {
      updateList = [...checkedId, e.target.value];
    } else {
      updateList.splice(checkedId.indexOf(e.target.value), 1);
    }
    setCheckedId(updateList);

    checkedId.length >= 1
      ? setToggleEnableButton(true)
      : setToggleEnableButton(false);
  };

  // MODAL NOVO CLIENTE
  const handleModalNewSupplier = async () => {
    setModalNewSupplierIsActive(!modalNewSupplierIsActive);
    await loadTable();
  };

  // MODAL UpdateAR CLIENTE
  const handleModalUpdateSupplier = async () => {
    const ID = checkedId[0];

    const ENDPOINT: string = `${API_URL}/${ID}`;
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const results = await response.json();
        setSupplierData(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(ENDPOINT);

    setModalUpdateClientIsActive(!modalUpdateClientIsActive);
    await loadTable();
  };

  //MODAL DELETAR CLIENTE
  const handleModalDeleteSupplier = async () => {
    setModalDeleteClienteIsActive(!modalDeleteClienteIsActive);
    await loadTable();
  };

  //CONTROLE FORM INPUTS
  const inputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

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
        handleModalNewClient={handleModalNewSupplier}
        handleModalEditClient={handleModalUpdateSupplier}
        handleDeleteSelectedCliente={handleModalDeleteSupplier}
      />
      <main className='table-wrapper'>
        {tableData && (
          <Table
            isChecked={checkedId}
            tableData={tableData}
            supplierData={supplierData}
            handleChecked={handleCheckedId}
            loadTable={loadTable}
          />
        )}
        <ModalNewSupplier
          supplierData={supplierData}
          inputChanges={inputChanges}
          handleModalNewSupplier={handleModalNewSupplier}
          modalNewSupplierIsActive={modalNewSupplierIsActive}
          loadTable={loadTable}
        />
        <ModalUpdateSupplier
          supplierData={supplierData}
          inputChanges={inputChanges}
          handleModalUpdateSupplier={handleModalUpdateSupplier}
          modalUpdateSupplierIsActive={modalUpdateClientIsActive}
          loadTable={loadTable}
        />
        <ModalDeleteSupplier
          checkedId={checkedId}
          inputChanges={inputChanges}
          handleDeleteSelectedSupplier={handleModalDeleteSupplier}
          modalDeleteSupplierIsActive={modalDeleteClienteIsActive}
        />
      </main>
    </div>
  );
}

export default App;
