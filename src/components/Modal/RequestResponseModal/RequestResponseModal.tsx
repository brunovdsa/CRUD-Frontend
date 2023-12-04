import { useState } from 'react';
import { Modal } from '../Modal';

interface RequestModalProps {
  handleModalNewSupplier: () => void;
  typeRequest: string;
}

export function RequestResponseModal(props: RequestModalProps) {
  const [modalRequestResponseIsActive, setModalRequestResponseIsActive] =
    useState(true);

  const handleRequestResponseModal = () => {
    props.handleModalNewSupplier();
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
            <h1>{`Supplier ${props.typeRequest} com sucesso!`}</h1>
            <button
              onClick={() =>
                setModalRequestResponseIsActive(!modalRequestResponseIsActive)
              }
            ></button>
          </Modal>
        </>
      )}
    </>
  );
}
