import { useState } from 'react';
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
  const [requestSend, setRequestSend] = useState<boolean>(false);

  const createNewSupplier = async (e: React.FormEvent) => {
    const body = new FormData();
    e.preventDefault();
    body.set('clienteData', JSON.stringify(props.supplierData));

    if (
      props.supplierData.nome === '' ||
      props.supplierData.email === '' ||
      props.supplierData.tipoFornecedor === '' ||
      props.supplierData.telefone === ''
    ) {
      setFieldsError(!fieldsError);
      return;
    } else {
      const fetchData = async (url: string) => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: body,
          });
          const results = await response.json();
          console.log(results);
          props.supplierData.nome === '' ||
            props.supplierData.email === '' ||
            props.supplierData.tipoFornecedor === '' ||
            props.supplierData.telefone === '';
          setRequestSend(true);
          props.handleModalNewSupplier();
          props.loadTable();
        } catch (err) {
          console.log(err);
        }
      };
      fetchData(API_URL);
      setRequestSend(false);
    }
  };

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
      {fieldsError === true ? <FieldsErrorModal /> : ''}
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
