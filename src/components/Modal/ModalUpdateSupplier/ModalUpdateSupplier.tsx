import { useState } from 'react';
import { SupplierDataProps } from '../../../interfaces/interfaces';
import { API_URL } from '../../../services/api';
import { Form } from '../../Form/Form';
import { Modal } from '../Modal';
import { RequestResponseModal } from '../RequestResponseModal/RequestResponseModal';
import { FieldsErrorModal } from '../FildsErrorModal/FieldsErrorModal';

interface ModalUpdateSupplierProps {
  supplierData: SupplierDataProps;
  modalUpdateSupplierIsActive: boolean;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalUpdateSupplier: () => void;
  loadTable: () => void;
}

export function ModalUpdateSupplier(props: ModalUpdateSupplierProps) {
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [emptyFiledsError, setEmptyFieldsError] = useState<boolean>(false);
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
      setEmptyFieldsError(true);
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
          if (results.status === 500) {
            console.log(results.status);
            setEmptyFieldsError(false);
            console.log(results);
          } else {
            props.handleModalUpdateSupplier();
            props.loadTable();
            setFieldsError(false);
            setEmptyFieldsError(false);
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
          handleModal={props.handleModalUpdateSupplier}
          typeRequest={'atualizado'}
        />
      ) : (
        ''
      )}
    </>
  );
}
