import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';
import { SupplierDataProps } from './interfaces/interfaces';

function App() {
  const [checkedId, setCheckedId] = useState<string[]>([]);
  const [toggleEnableButton, setToggleEnableButton] = useState<boolean>(true);
  const [modalNewSupplierIsActive, setModalNewSupplierIsActive] =
    useState<boolean>(false);
  const [modalEditClientIsActive, setModalEditClientIsActive] = useState(false);
  const [modalDeleteClienteIsActive, setModalDeleteClienteIsActive] =
    useState(false);

  const [requestSend, setRequestSend] = useState<boolean>(false);
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [supplierData, setSupplierData] = useState<SupplierDataProps>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    tipoFornecedor: 'selecione',
    observacao: '',
  });

  const [statusRequest, setStatusRequest] = useState<number>();

  // CHECK ID
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
  const handleModalNewClient = (e: React.MouseEvent<HTMLElement>) => {
    setModalNewSupplierIsActive(!modalNewSupplierIsActive);
    e.preventDefault();
  };

  // MODAL EDITAR CLIENTE
  const handleModalEditClient = (e: React.MouseEvent<HTMLElement>) => {
    const ID = checkedId[0];

    const ENDPOINT: string = `http://localhost:8080/api/clientes/${ID}`;
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

    setModalEditClientIsActive(!modalEditClientIsActive);
    e.preventDefault();
  };

  //MODAL DELETAR CLIENTE
  const handleDeleteCliente = (e: React.MouseEvent<HTMLElement>) => {
    setModalDeleteClienteIsActive(!modalDeleteClienteIsActive);
    e.preventDefault();
  };

  //CONTROLE FORM INPUTS
  const inputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSupplierData({
      ...supplierData,
      [e.target.name]: value,
    });
  };

  const createNewClient = async (e: React.FormEvent) => {
    const body = new FormData();
    body.set('clienteData', JSON.stringify(supplierData));
    e.preventDefault();

    if (
      supplierData.nome === '' ||
      supplierData.email === '' ||
      supplierData.tipoFornecedor === '' ||
      supplierData.telefone === ''
    ) {
      setFieldsError(true);
      return;
    } else {
      await fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        body: body,
      })
        .then((res) => {
          setStatusRequest(res.status);
          setRequestSend(true);
          supplierData.nome === '' ||
            supplierData.email === '' ||
            supplierData.tipoFornecedor === '' ||
            supplierData.telefone === '';
        })
        .catch((err) => {
          setStatusRequest(err);
          setRequestSend(false);
        });
    }
  };

  const upDateSelectedClient = async (e: React.FormEvent) => {
    const body = new FormData();
    body.set('clienteData', JSON.stringify(supplierData));
    e.preventDefault();
    await fetch('http://localhost:8080/api/clientes', {
      method: 'PUT',
      body: body,
    })
      .then((res) => {
        setStatusRequest(res.status);
        setRequestSend(true);
      })
      .catch((err) => {
        setStatusRequest(err);
        setRequestSend(false);
      });
  };

  const deleteSelectedCliente = async (e: any) => {
    const ID = checkedId[0];
    // e.preventDefault();
    await fetch(`http://localhost:8080/api/clientes/${ID}`, {
      method: 'DELETE',
    })
      .then((res) => {
        setStatusRequest(res.status);
        // setRequestSend(true);
      })
      .catch((err) => {
        setStatusRequest(err);
        // setRequestSend(false);
      });
    setModalDeleteClienteIsActive(!modalDeleteClienteIsActive);
  };

  return (
    <div>
      <Header
        checkedId={[]}
        toggleEnableButton={toggleEnableButton}
        requestSend={requestSend}
        fieldsError={fieldsError}
        modalNewSupplierIsActive={modalNewSupplierIsActive}
        modalEditClientIsActive={modalEditClientIsActive}
        modalDeleteClienteIsActive={modalDeleteClienteIsActive}
        handleModalNewClient={handleModalNewClient}
        handleModalEditClient={handleModalEditClient}
        handleDeleteSelectedCliente={handleDeleteCliente}
        inputChanges={inputChanges}
        createNewClient={createNewClient}
        upDateSelectedClient={upDateSelectedClient}
        deleteSelectedCliente={deleteSelectedCliente}
        supplierData={supplierData}
      />
      <main className='table-wrapper'>
        <Table handleChecked={handleCheckedId} isChecked={checkedId} />
      </main>
    </div>
  );
}

export default App;
