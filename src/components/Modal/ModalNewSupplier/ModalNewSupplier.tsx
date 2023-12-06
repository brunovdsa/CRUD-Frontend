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
  const [requestSend, setRequestSend] = useState<boolean>(false);
  const [fieldsError, setFieldsError] = useState<boolean>(false);
  const [emptyFiledsError, setEmptyFieldsError] = useState<boolean>(false);
  const [isEmailFormated, setIsEmailFormated] = useState<boolean>(false);

  const createNewSupplier = async (e: React.FormEvent) => {
    const body = new FormData();
    e.preventDefault();
    body.set('clienteData', JSON.stringify(props.supplierData));

    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    {
    }

    if (
      props.supplierData.nome === '' ||
      props.supplierData.email === '' ||
      props.supplierData.tipoFornecedor === '' ||
      props.supplierData.telefone === ''
    ) {
      setFieldsError(true);
      setEmptyFieldsError(true);
      setIsEmailFormated(false);
      return;
    }
    if (!regEmail.test(props.supplierData.email)) {
      setFieldsError(true);
      setIsEmailFormated(false);
      setEmptyFieldsError(false);
    } else {
      const fetchData = async (url: string) => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: body,
          });
          const results = await response.json();
          console.log(results);
          if (results.status === 500) {
            setFieldsError(true);
            setEmptyFieldsError(false);
            setIsEmailFormated(true);
          } else {
            props.supplierData.nome === '' ||
              props.supplierData.email === '' ||
              props.supplierData.tipoFornecedor === '' ||
              props.supplierData.telefone === '';
            props.onClick();
            props.loadTable();
            setRequestSend(true);
            setFieldsError(false);
          }
        } catch (err) {
          alert(`Erro: ${err}. Tente novamente.`);
        }
      };
      fetchData(API_URL);
    }
  };

  console.log('fieldsErro: ', fieldsError);
  console.log('emptyFields: ', emptyFiledsError);
  console.log('email formated: ', isEmailFormated);
  console.log('requestSend: ', requestSend);

  const clear = () => {
    setFieldsError(false);
    setIsEmailFormated(false);
    setEmptyFieldsError(false);
    setRequestSend(false);
  };

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

      {fieldsError === true &&
      emptyFiledsError === true &&
      isEmailFormated === false ? (
        <FieldsErrorModal
          errorDescription='Preencha todos os campos em branco!'
          clear={clear}
        />
      ) : (
        ''
      )}

      {fieldsError === true &&
      emptyFiledsError === false &&
      isEmailFormated === true ? (
        <FieldsErrorModal
          errorDescription='Email já cadastrado!'
          clear={clear}
        />
      ) : (
        ''
      )}

      {fieldsError === true &&
      emptyFiledsError === false &&
      isEmailFormated === false ? (
        <FieldsErrorModal
          errorDescription={'Formato de email inválido!'}
          clear={clear}
        />
      ) : (
        ''
      )}

      {requestSend === true && fieldsError === false ? (
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
