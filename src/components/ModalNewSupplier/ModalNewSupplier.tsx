import { Container } from '../Container/Container';
import { Form } from '../Form/Form';
import './ModalNewSupplier.scss';

interface ModalNewSupplierProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export function ModalNewSupplier(props: ModalNewSupplierProps) {
  return (
    <Container>
      <div className='modal-bg'>
        <div className='modal'>
          <Form onClick={props.onClick} />
        </div>
      </div>
    </Container>
  );
}
