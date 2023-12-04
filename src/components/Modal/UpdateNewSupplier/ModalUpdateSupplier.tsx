import { useState } from 'react';
import { SupplierDataProps } from '../../../interfaces/interfaces';
import { API_URL } from '../../../services/api';
import { Form } from '../../Form/Form';
import { Modal } from '../Modal';

interface ModalUpdateSupplierProps {
  supplierData: SupplierDataProps;
  modalUpdateSupplierIsActive: boolean;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalUpdateSupplier: () => void;
  loadTable: () => void;
}

export function ModalUpdateSupplier(props: ModalUpdateSupplierProps) {
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [requestSend, setRequestSend] = useState<boolean>(false);

  const upDateSelectedSupplier = async () => {
    const body = new FormData();
    body.set('clienteData', JSON.stringify(props.supplierData));

    if (
      props.supplierData.nome === '' ||
      props.supplierData.email === '' ||
      props.supplierData.tipoFornecedor === '' ||
      props.supplierData.telefone === ''
    ) {
      setFieldsError(true);
      return;
    } else {
      const fetchData = async (url: string) => {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            body: body,
          });
          const results = await response.json();
          console.log(results);
          setRequestSend(true);
          props.handleModalUpdateSupplier();
          props.loadTable();
        } catch (err) {
          console.log(err);
        }
      };
      fetchData(API_URL);
    }
  };

  return (
    <>
      {props.modalUpdateSupplierIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleModalUpdateSupplier}
          ></div>
          <div>
            <Modal>
              <Form
                onClick={props.handleModalUpdateSupplier}
                supplierData={props.supplierData}
                inputChanges={props.inputChanges}
                onSubmit={upDateSelectedSupplier}
              />
            </Modal>
          </div>
        </>
      )}
      {/* {fieldsError === true ? (
        <RequestResponseModal
          handleModalNewSupplier={props.handleModalUpdateSupplier}
        />
      ) : (
        ''
      )} */}
      {requestSend === true ? (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleModalUpdateSupplier}
          ></div>
          <Modal>
            <h1>Supplier atualizado com sucesso!</h1>
            <button onClick={props.handleModalUpdateSupplier}></button>
          </Modal>
        </>
      ) : (
        ''
      )}
    </>
  );
}
