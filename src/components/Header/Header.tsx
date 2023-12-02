import React, { useState } from 'react';

import { DeleteIcon, EditIcon } from '../Icons/Icons';
import { Modal } from '../Modal/Modal';
import './Header.scss';
import { Form } from '../Form/Form';

interface HeaderProps {
  checkedId: String[];
  toggleEnableButton: boolean;
}

export interface SupplierDataProps {
  id: number;
  nome: string;
  telefone: string;
  observacao: string;
  tipoFornecedor: string;
  email: string;
}

export function Header(props: HeaderProps) {
  const [modalNewClientOpen, setModalNewClientOpen] = useState<boolean>(false);
  const [modalEditClientOpen, setModalEditClientOpen] = useState(false);
  const [modalDeleteClienteOpen, setModalDeleteClienteOpen] =
    useState<boolean>(false);
  const [requestSend, setRequestSend] = useState<boolean>(false);
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [statusRequest, setStatusRequest] = useState<number>();
  const [supplierData, setSupplierData] = useState<SupplierDataProps>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    tipoFornecedor: 'selecione',
    observacao: '',
  });

  const handleModalNewClientActive = (e: React.MouseEvent<HTMLElement>) => {
    setModalNewClientOpen(!modalNewClientOpen);
    e.preventDefault();
  };

  const handleModalEditClientActive = (e: React.MouseEvent<HTMLElement>) => {
    const ID = props.checkedId[0];

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

    setModalEditClientOpen(!modalEditClientOpen);
    e.preventDefault();
  };

  const handleModalDeletSelectedClient = async (e: React.FormEvent) => {
    setModalDeleteClienteOpen(!modalDeleteClienteOpen);
    e.preventDefault();
  };

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

  const deleteSelectedCliente = async (e: React.FormEvent) => {
    const ID = props.checkedId[0];
    e.preventDefault();
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
  };

  return (
    <header className='header-container'>
      <button className='add-supplier-btn' onClick={handleModalNewClientActive}>
        Novo
      </button>
      <button
        className='edit-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={handleModalEditClientActive}
      >
        <EditIcon />
      </button>
      <button
        className='delete-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={handleModalDeletSelectedClient}
      >
        <DeleteIcon />
      </button>

      {modalNewClientOpen && (
        <>
          <div
            className='bg-overlay'
            onClick={handleModalNewClientActive}
          ></div>
          <div>
            <Modal>
              <Form
                onClick={handleModalNewClientActive}
                supplierData={supplierData}
                inputChanges={inputChanges}
                onSubmit={createNewClient}
                requestSend={requestSend}
                fieldsError={fieldsError}
                handleModalNewClientActive={handleModalNewClientActive}
              />
            </Modal>
          </div>
        </>
      )}
      {modalEditClientOpen && (
        <>
          <div
            className='bg-overlay'
            onClick={handleModalEditClientActive}
          ></div>
          <div>
            <Modal>
              <Form
                onClick={handleModalEditClientActive}
                supplierData={supplierData}
                inputChanges={inputChanges}
                onSubmit={upDateSelectedClient}
                requestSend={requestSend}
                fieldsError={fieldsError}
              />
            </Modal>
          </div>
        </>
      )}
      {modalDeleteClienteOpen && (
        <>
          <div
            className='bg-overlay'
            onClick={handleModalDeletSelectedClient}
          ></div>
          <div>
            <Modal>
              <>
                <h1>Atenção!</h1>
                <span>
                  Tem certeza que deseja deletar o fornecedor selecionado?
                </span>
                <button onClick={handleModalDeletSelectedClient}>
                  Cancelar
                </button>
                <button onClick={deleteSelectedCliente}>Deletar</button>
              </>
            </Modal>
          </div>
        </>
      )}
    </header>
  );
}
