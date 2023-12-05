import './ReturnButton.scss';

interface ReturnButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  action: string;
}

export function ReturnButton(props: ReturnButtonProps) {
  return (
    <button onClick={props.onClick} className='btn-cancel'>
      {props.action}
    </button>
  );
}
