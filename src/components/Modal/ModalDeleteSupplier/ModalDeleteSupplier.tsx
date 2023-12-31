import { useState } from 'react';

import { API_URL } from '../../../services/api';

import { Modal } from '../Modal';
import { ExclamationIcon } from '../../Icons/Icons';
import { SubmitButton } from '../../SubmitButton/SubmitButton';
import { ReturnButton } from '../../CancelButton/ReturnButton';
import { ModalRequestSuccessResponse } from '../ModalRequestSuccessResponse/ModalRequestSuccessResponse';

import './ModalDeleteSupplier.scss';

interface ModalDeleteSupplierProps {
  modalDeleteSupplierIsActive: boolean;
  checkedId: number;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckedId: (id: number) => void;
  onClick: () => void;
}

export function ModalDeleteSupplier(props: ModalDeleteSupplierProps) {
  const [requestSend, setRequestSend] = useState<boolean>(false);

  const deleteSelectedSupplier = async () => {
    await fetch(`${API_URL}/${props.checkedId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          setRequestSend(true);
          props.onClick();
          props.handleCheckedId(0);
        } else {
          setRequestSend(false);
          props.onClick();
        }
      })
      .catch((err) => {
        alert(`Erro: ${err}. Tente novamente.`);
      });
  };

  return (
    <>
      {props.modalDeleteSupplierIsActive && (
        <>
          <div className='bg-overlay' onClick={props.onClick}></div>
          <div>
            <Modal>
              <div className='container-modal-delete'>
                <div className='header-modal-delete'>
                  <ExclamationIcon style={{ color: '#0065b3' }} />
                  <h1>Atenção!</h1>
                </div>
                <span>
                  Tem certeza que deseja deletar o fornecedor selecionado?
                </span>
                <div className='footer-modal-delete'>
                  <ReturnButton action={'Cancelar'} onClick={props.onClick} />
                  <SubmitButton
                    action={'Deletar'}
                    onClick={deleteSelectedSupplier}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}

      {requestSend === true ? (
        <ModalRequestSuccessResponse
          handleModal={props.onClick}
          typeRequest={'deletado'}
        />
      ) : (
        ''
      )}
    </>
  );
}
