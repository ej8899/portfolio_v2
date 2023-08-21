/* eslint-disable prettier/prettier */
import { ReactNode } from 'react';

type TProps = {
  tooltip: string;
  children: ReactNode;
};

function Chatbot({ tooltip: name, children }: TProps) {
  return (
    <div>
      {children}
    </div>
  );
}

export default Chatbot;
