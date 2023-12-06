export interface SupplierDataProps {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipoFornecedor?: string;
  observacao?: string;
  favorite?: boolean;
}

export interface ModalSupplierProps {
  supplierData: SupplierDataProps;
  checkedId?: number;
  modalSupplierIsActive: boolean;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  loadTable: () => void;
}
