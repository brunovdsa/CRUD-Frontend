import React, { useState } from 'react';
import { Container } from '../Container/Container';
import { Form } from '../Form/Form';
import './ModalNewSupplier.scss';

interface ModalNewSupplierProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface clienteDataProps {
  id: number;
  nome: string;
  telefone: string;
  observacao: string;
  tipoFornecedor: string;
  email: string;
}

export function ModalNewSupplier(props: ModalNewSupplierProps) {
  const [clienteData, setClienteData] = useState<clienteDataProps>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    tipoFornecedor: 'selecione',
    observacao: '',
  });

  const inputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setClienteData({
      ...clienteData,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (e: any) => {
    const body = new FormData();

    body.set('clienteData', JSON.stringify(clienteData));

    console.log(clienteData);

    e.preventDefault();
    await fetch('http://localhost:8080/api/clientes', {
      method: 'POST',
      body: body,
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <div className='modal-bg'>
        <div className='modal'>
          <Form
            onClick={props.onClick}
            clienteData={clienteData}
            inputChanges={inputChanges}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </Container>
  );
}
