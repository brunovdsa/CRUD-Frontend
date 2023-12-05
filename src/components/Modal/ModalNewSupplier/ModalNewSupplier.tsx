import { useEffect, useState } from 'react';
import { SupplierDataProps } from '../../../interfaces/interfaces';
import { Form } from '../../Form/Form';
import { Modal } from '../Modal';
import { API_URL } from '../../../services/api';
import { RequestResponseModal } from '../RequestResponseModal/RequestResponseModal';
import { FieldsErrorModal } from '../FildsErrorModal/FieldsErrorModal';

interface ModalNewSupplierProps {
  supplierData: SupplierDataProps;
  modalNewSupplierIsActive: boolean;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalNewSupplier: () => void;
  loadTable: () => void;
}

export function ModalNewSupplier(props: ModalNewSupplierProps) {
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [emptyFiledsError, setEmptyFieldsError] = useState<boolean>(false);
  const [requestSend, setRequestSend] = useState<boolean>(false);
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  const createNewSupplier = async (e: React.FormEvent) => {
    // let regEmail =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (regEmail.test(props.supplierData.email)) {
    //   setEmailIsValid(true);
    // } else {
    //   setEmailIsValid(false);
    // }

    const body = new FormData();
    e.preventDefault();
    body.set('clienteData', JSON.stringify(props.supplierData));

    if (
      props.supplierData.nome === '' ||
      props.supplierData.email === '' ||
      props.supplierData.tipoFornecedor === '' ||
      props.supplierData.telefone === ''
    ) {
      setFieldsError(true);
      setEmptyFieldsError(true);
      return;
    } else {
      const fetchData = async (url: string) => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: body,
          });
          const results = await response.json();
          if (results.status === 500) {
            console.log(results.status);
            setEmptyFieldsError(false);
          } else {
            props.supplierData.nome === '' ||
              props.supplierData.email === '' ||
              props.supplierData.tipoFornecedor === '' ||
              props.supplierData.telefone === '';
            setFieldsError(false);
            setEmptyFieldsError(false);
            props.handleModalNewSupplier();
            props.loadTable();
            setRequestSend(true);
          }
        } catch (err) {
          alert(err);
        }
      };
      fetchData(API_URL);
      setRequestSend(false);
    }
  };

  console.log('FIELDS ERROR: ', fieldsError);
  console.log('EMPTY FIELDS ERROR ERROR: ', emptyFiledsError);
  return (
    <>
      {props.modalNewSupplierIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleModalNewSupplier}
          ></div>
          <div>
            <Modal>
              <Form
                onClick={props.handleModalNewSupplier}
                supplierData={props.supplierData}
                inputChanges={props.inputChanges}
                onSubmit={createNewSupplier}
                typeAction={'Novo'}
              />
            </Modal>
          </div>
        </>
      )}
      {fieldsError === true && emptyFiledsError === true ? (
        <FieldsErrorModal errorDescription='Preencha todos os campos em branco!' />
      ) : (
        ''
      )}

      {fieldsError === true && emptyFiledsError === false ? (
        <FieldsErrorModal errorDescription='Email já cadastrado!' />
      ) : (
        ''
      )}
      {requestSend === true ? (
        <RequestResponseModal
          handleModal={props.handleModalNewSupplier}
          typeRequest={'criado'}
        />
      ) : (
        ''
      )}
    </>
  );
}
