import { useState } from 'react';

import { API_URL, regexEmail } from '../../../services/api';

import { Modal } from '../Modal';
import { Form } from '../../Form/Form';
import { ModalErrorToShow } from '../ModalErrorToShow/ModalErrorToShow';

import { ModalSupplierProps } from '../../../interfaces/interfaces';

export function ModalUpdateSupplier(props: ModalSupplierProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [emptyFiledsError, setEmptyFieldsError] = useState<boolean>(false);
  const [requestSend, setRequestSend] = useState<boolean>(false);
  const [isEmailFormated, setIsEmailFormated] = useState<boolean>(false);

  const upDateSelectedSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    body.set('clienteData', JSON.stringify(props.supplierData));

    if (
      props.supplierData.nome === '' ||
      props.supplierData.email === '' ||
      props.supplierData.tipoFornecedor === '' ||
      props.supplierData.telefone === ''
    ) {
      setHasError(true);
      setEmptyFieldsError(true);
      return;
    }
    if (!regexEmail.test(props.supplierData.email)) {
      setHasError(true);
      setIsEmailFormated(false);
      setEmptyFieldsError(false);
    } else {
      const fetchData = async (url: string) => {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            body: body,
          });
          setRequestSend(true);
          const results = await response.json();
          if (results.status === 500) {
            setHasError(true);
            setEmptyFieldsError(false);
            setIsEmailFormated(true);
          } else {
            props.onClick();
            props.loadTable();
            setRequestSend(true);
            setHasError(false);
          }
        } catch (err) {
          alert(err);
        }
      };
      fetchData(API_URL);
      setRequestSend(false);
    }
  };

  const clearFieldsStates = () => {
    setHasError(false);
    setIsEmailFormated(false);
    setEmptyFieldsError(false);
    setRequestSend(false);
  };

  return (
    <>
      {props.modalSupplierIsActive && (
        <>
          <div className='bg-overlay' onClick={props.onClick}></div>
          <div>
            <Modal>
              <Form
                onClick={props.onClick}
                supplierData={props.supplierData}
                inputChanges={props.inputChanges}
                onSubmit={upDateSelectedSupplier}
                typeAction={'Atualizar'}
              />
            </Modal>
          </div>
        </>
      )}
      <ModalErrorToShow
        hasError={hasError}
        emptyFieldsError={emptyFiledsError}
        isEmailFormated={isEmailFormated}
        requestSend={requestSend}
        clearFieldsStates={clearFieldsStates}
        onClick={props.onClick}
      />
    </>
  );
}
