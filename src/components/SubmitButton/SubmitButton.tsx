import './SubmitButton.scss';

interface SubmitButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  action: string;
}

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <button onClick={props.onClick} className='btn-submit-form'>
      {props.action}
    </button>
  );
}
