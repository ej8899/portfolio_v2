import { ReactNode } from 'react';
import './DevIcon.scss';

type TProps = {
  tooltip: string;
  children: ReactNode;
};

function DevIcon({ tooltip: name, children }: TProps) {
  return (
    <div className='dev-icon greyscaleicon' data-tooltip={name}>
      {children}
    </div>
  );
}

export default DevIcon;
