export interface ContainerProps {
  children: JSX.Element;

  className?: string;
  onClick?: () => void;
}

export interface HeaderProps {
  onClick: () => void;
  isActive: boolean;
}

export interface ModalNewSupplierProps {
  onClick: () => void;
}
