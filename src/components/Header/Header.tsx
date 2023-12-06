import { DeleteIcon, EditIcon } from '../Icons/Icons';
import { SupplierDataProps } from '../../interfaces/interfaces';

import './Header.scss';

interface HeaderProps {
  checkedId: number;
  toggleEnableButton: boolean;
  handleModalNewSupplier: (e: React.MouseEvent<HTMLElement>) => void;
  handleModalEditSupplier: (e: React.MouseEvent<HTMLElement>) => void;
  handleDeleteSelectedSupplier: (e: React.MouseEvent<HTMLElement>) => void;
  supplierData: SupplierDataProps;
}

export function Header(props: HeaderProps) {
  return (
    <header className='header-container'>
      <button
        className='add-supplier-btn'
        onClick={props.handleModalNewSupplier}
      >
        Novo
      </button>
      <button
        className='edit-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={props.handleModalEditSupplier}
      >
        <EditIcon />
      </button>
      <button
        className='delete-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={props.handleDeleteSelectedSupplier}
      >
        <DeleteIcon />
      </button>
    </header>
  );
}
