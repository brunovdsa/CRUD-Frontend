import { useState } from 'react';

import { DeleteIcon, EditIcon } from '../Icons/Icons';
import { ModalNewSupplier } from '../ModalNewSupplier/ModalNewSupplier';
import './Header.scss';

export function Header() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleModalActive = () => {
    setIsActive(!isActive);
  };

  return (
    <header className='header-container'>
      <button className='add-supplier-btn' onClick={handleModalActive}>
        Novo
      </button>
      <button className='edit-supplier-btn'>
        <EditIcon />
      </button>
      <button className='delete-supplier-btn'>
        <DeleteIcon />
      </button>

      {isActive === true ? (
        <div>
          <ModalNewSupplier onClick={handleModalActive}></ModalNewSupplier>
        </div>
      ) : (
        ''
      )}
    </header>
  );
}
