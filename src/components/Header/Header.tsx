import React, { useState } from 'react';

import { DeleteIcon, EditIcon } from '../Icons/Icons';
import { Modal } from '../Modal/Modal';
import './Header.scss';
import { Form } from '../Form/Form';
import { SupplierDataProps } from '../../interfaces/interfaces';

interface HeaderProps {
  checkedId: String[];
  toggleEnableButton: boolean;

  requestSend: boolean;
  fieldsError: boolean;

  modalNewSupplierIsActive: boolean;
  modalEditClientIsActive: boolean;
  modalDeleteClienteIsActive: boolean;

  handleModalNewClient: (e: React.MouseEvent<HTMLElement>) => void;
  handleModalEditClient: (e: React.MouseEvent<HTMLElement>) => void;
  handleDeleteSelectedCliente: (e: React.MouseEvent<HTMLElement>) => void;

  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;

  createNewClient: (e: React.FormEvent) => void;
  upDateSelectedClient: (e: React.FormEvent) => void;
  deleteSelectedCliente: (e: any) => void;

  supplierData: SupplierDataProps;
}

export function Header(props: HeaderProps) {
  return (
    <header className='header-container'>
      <button
        className='add-supplier-btn'
        onClick={props.handleModalEditClient}
      >
        Novo
      </button>
      <button
        className='edit-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={props.handleModalEditClient}
      >
        <EditIcon />
      </button>
      <button
        className='delete-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={props.handleDeleteSelectedCliente}
      >
        <DeleteIcon />
      </button>

      {props.modalNewSupplierIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleModalNewClient}
          ></div>
          <div>
            <Modal>
              <Form
                onClick={props.handleModalNewClient}
                supplierData={props.supplierData}
                inputChanges={props.inputChanges}
                onSubmit={props.createNewClient}
                requestSend={props.requestSend}
                fieldsError={props.fieldsError}
                handleModalNewClientActive={props.handleModalNewClient}
              />
            </Modal>
          </div>
        </>
      )}
      {props.modalEditClientIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleModalEditClient}
          ></div>
          <div>
            <Modal>
              <Form
                onClick={props.handleModalEditClient}
                supplierData={props.supplierData}
                inputChanges={props.inputChanges}
                onSubmit={props.upDateSelectedClient}
                requestSend={props.requestSend}
                fieldsError={props.fieldsError}
              />
            </Modal>
          </div>
        </>
      )}
      {props.modalDeleteClienteIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleDeleteSelectedCliente}
          ></div>
          <div>
            <Modal>
              <>
                <h1>Atenção!</h1>
                <span>
                  Tem certeza que deseja deletar o fornecedor selecionado?
                </span>
                <button onClick={props.handleDeleteSelectedCliente}>
                  Cancelar
                </button>
                <button onClick={props.deleteSelectedCliente}>Deletar</button>
              </>
            </Modal>
          </div>
        </>
      )}
    </header>
  );
}
