import React, { useState } from 'react';

import { DeleteIcon, EditIcon } from '../Icons/Icons';
import { ModalNewSupplier } from '../ModalNewSupplier/ModalNewSupplier';
import './Header.scss';

export function Header() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleModalActive = (e: React.MouseEvent<HTMLElement>) => {
    setIsActive(!isActive);
    e.preventDefault();
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

      {isActive && (
        <>
          <div className='bg-overlay' onClick={handleModalActive}></div>
          <div>
            <ModalNewSupplier onClick={handleModalActive}></ModalNewSupplier>
          </div>
        </>
      )}
    </header>
  );
}
