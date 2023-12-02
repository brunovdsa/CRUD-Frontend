import { ReactNode } from 'react';
import { Container } from '../Container/Container';
import './Modal.scss';

interface ModalProps {
  children: ReactNode;
  handleModalNewClientActive?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Modal(props: ModalProps) {
  return (
    <Container>
      <div className='modal-bg'>
        <div className='modal'>{props.children}</div>
      </div>
    </Container>
  );
}
