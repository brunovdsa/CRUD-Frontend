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
  onClick: () => void;
  loadTable: () => void;
}

export function ModalNewSupplier(props: ModalNewSupplierProps) {
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [requestSend, setRequestSend] = useState<boolean>(false);
  const [emptyFiledsError, setEmptyFieldsError] = useState<boolean>(false);
  const [isEmailFormated, setIsEmailFormated] = useState<boolean>(false);

  const emailMask = (e: any) => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(e.currentTarget.value)) {
      setEmptyFieldsError(true);
      setIsEmailFormated(true);
    } else {
      setEmptyFieldsError(false);
      setIsEmailFormated(false);
    }
  };

  const createNewSupplier = async (e: React.FormEvent) => {
    const body = new FormData();
    e.preventDefault();
    body.set('clienteData', JSON.stringify(props.supplierData));

    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      if (regEmail.test(props.supplierData.email)) {
        const fetchData = async (url: string) => {
          try {
            const response = await fetch(url, {
              method: 'POST',
              body: body,
            });
            const results = await response.json();
            if (results.status === 500) {
              setFieldsError(true);
              setEmptyFieldsError(false);
              setIsEmailFormated(false);
            } else {
              props.supplierData.nome === '' ||
                props.supplierData.email === '' ||
                props.supplierData.tipoFornecedor === '' ||
                props.supplierData.telefone === '';
              setFieldsError(false);
              setEmptyFieldsError(false);
              props.onClick();
              props.loadTable();
              setRequestSend(true);
            }
          } catch (err) {
            alert(`Erro: ${err}. Tente novamente.`);
          }
        };
        fetchData(API_URL);
        setRequestSend(false);
      } else {
        setFieldsError(true);
        setEmptyFieldsError(false);
        setIsEmailFormated(false);
      }
    }
  };

  console.log('fieldsErro: ', fieldsError);
  console.log('emptyFields: ', emptyFiledsError);
  console.log('email formated: ', isEmailFormated);

  return (
    <>
      {props.modalNewSupplierIsActive && (
        <>
          <div className='bg-overlay' onClick={props.onClick}></div>
          <div>
            <Modal>
              <Form
                onClick={props.onClick}
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

      {fieldsError === true && isEmailFormated === false ? (
        <FieldsErrorModal errorDescription={'Formato de email inválido!'} />
      ) : (
        ''
      )}

      {requestSend === true ? (
        <RequestResponseModal
          handleModal={props.onClick}
          typeRequest={'criado'}
        />
      ) : (
        ''
      )}
    </>
  );
}
