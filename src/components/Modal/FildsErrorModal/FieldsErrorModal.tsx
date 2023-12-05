import { useState } from 'react';
import { Modal } from '../Modal';
import { ExclamationIcon } from '../../Icons/Icons';
import { SubmitButton } from '../../SubmitButton/SubmitButton';

interface FieldsErrorModalProps {
  errorDescription: string;
}

export function FieldsErrorModal(props: FieldsErrorModalProps) {
  const [modalFieldsErrorIsActive, setModalFieldsErrorIsActive] =
    useState(true);

  const handleModalFieldsError = () => {
    setModalFieldsErrorIsActive(!modalFieldsErrorIsActive);
  };

  return (
    <>
      {modalFieldsErrorIsActive && (
        <>
          <div className='bg-overlay' onClick={handleModalFieldsError}></div>
          <Modal>
            <div className='container-modal-request'>
              <ExclamationIcon style={{ color: '#0065b3' }} />
              <h1 className='title'>Atenção!</h1>
              <span>{props.errorDescription}</span>
              <SubmitButton
                onClick={() => handleModalFieldsError()}
                action={'Ok'}
              />
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
