import { useState } from 'react';
import { Modal } from '../Modal';
import { ExclamationIcon } from '../../Icons/Icons';
import { SubmitButton } from '../../SubmitButton/SubmitButton';

export function FieldsErrorModal() {
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
              <span>Preencha todos os campos em branco!</span>
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
