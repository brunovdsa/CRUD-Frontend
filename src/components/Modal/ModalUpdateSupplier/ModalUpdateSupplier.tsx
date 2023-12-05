import { useEffect, useState } from 'react';
import { SupplierDataProps } from '../../../interfaces/interfaces';
import { API_URL } from '../../../services/api';
import { Form } from '../../Form/Form';
import { Modal } from '../Modal';
import { RequestResponseModal } from '../RequestResponseModal/RequestResponseModal';

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

  const upDateSelectedSupplier = async (e: React.FormEvent) => {
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
      return;
    } else {
      const fetchData = async (url: string) => {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            body: body,
          });
          setRequestSend(true);
          const results = await response.json();
          console.log(results);
          props.handleModalUpdateSupplier();
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
                typeAction={'Atualizar'}
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
        <RequestResponseModal
          handleModalNewSupplier={props.handleModalUpdateSupplier}
          typeRequest={'atualizado'}
        />
      ) : (
        ''
      )}
    </>
  );
}
