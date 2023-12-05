import { API_URL } from '../../../services/api';
import { ReturnButton } from '../../CancelButton/ReturnButton';
import { ExclamationIcon } from '../../Icons/Icons';
import { SubmitButton } from '../../SubmitButton/SubmitButton';
import { Modal } from '../Modal';
import './ModalDeleteSupplier.scss';

interface ModalDeleteSupplierProps {
  modalDeleteSupplierIsActive: boolean;
  checkedId: number;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckedId: (id: number) => void;
  onClick: () => void;
}

export function ModalDeleteSupplier(props: ModalDeleteSupplierProps) {
  //DELETA Supplier SELECIONADO
  const deleteSelectedSupplier = async () => {
    await fetch(`${API_URL}/${props.checkedId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log(res);
        props.onClick();
        props.handleCheckedId(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {props.modalDeleteSupplierIsActive && (
        <>
          <div className='bg-overlay' onClick={props.onClick}></div>
          <div>
            <Modal>
              <div className='container-modal-delete'>
                <div className='header-modal-delete'>
                  <ExclamationIcon style={{ color: '#0065b3' }} />
                  <h1>Atenção!</h1>
                </div>
                <span>
                  Tem certeza que deseja deletar o fornecedor selecionado?
                </span>
                <div className='footer-modal-delete'>
                  <ReturnButton action={'Cancelar'} onClick={props.onClick} />
                  <SubmitButton
                    action={'Deletar'}
                    onClick={deleteSelectedSupplier}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}
