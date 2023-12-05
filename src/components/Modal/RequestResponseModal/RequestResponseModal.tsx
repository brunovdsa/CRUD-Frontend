import { useState } from 'react';
import { Modal } from '../Modal';
import { SubmitButton } from '../../SubmitButton/SubmitButton';
import './RequestResponseModal.scss';
import { SuccessIcon } from '../../Icons/Icons';

interface RequestModalProps {
  handleModal: () => void;
  typeRequest: string;
}

export function RequestResponseModal(props: RequestModalProps) {
  const [modalRequestResponseIsActive, setModalRequestResponseIsActive] =
    useState(true);

  const handleRequestResponseModal = () => {
    props.handleModal();
    setModalRequestResponseIsActive(!modalRequestResponseIsActive);
  };

  return (
    <>
      {modalRequestResponseIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={handleRequestResponseModal}
          ></div>
          <Modal>
            <div className='container-modal-request'>
              <SuccessIcon style={{ color: '#0065b3' }} />
              <h1 className='title'>{`Fornecedor ${props.typeRequest} com sucesso!`}</h1>
              <SubmitButton
                onClick={() =>
                  setModalRequestResponseIsActive(!modalRequestResponseIsActive)
                }
                action={'Ok'}
              />
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
