import { DeleteIcon, EditIcon } from '../Icons/Icons';
import './Header.scss';
import { SupplierDataProps } from '../../interfaces/interfaces';

interface HeaderProps {
  checkedId: String[];
  toggleEnableButton: boolean;
  handleModalNewClient: (e: React.MouseEvent<HTMLElement>) => void;
  handleModalEditClient: (e: React.MouseEvent<HTMLElement>) => void;
  handleDeleteSelectedCliente: (e: React.MouseEvent<HTMLElement>) => void;
  supplierData: SupplierDataProps;
}

export function Header(props: HeaderProps) {
  return (
    <header className='header-container'>
      <button className='add-supplier-btn' onClick={props.handleModalNewClient}>
        Novo
      </button>
      <button
        className='edit-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={props.handleModalEditClient}
      >
        <EditIcon />
      </button>
      <button
        className='delete-supplier-btn'
        disabled={props.toggleEnableButton}
        onClick={props.handleDeleteSelectedCliente}
      >
        <DeleteIcon />
      </button>
    </header>
  );
}
