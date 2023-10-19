import React from '../../assets/components/React';
import { createContext, useContext, useState, useEffect } from 'react';

import './Modal.scss';

type ModalContextType = {
  openModal: (modalTitle: string, content: React.ReactNode, modalFooter: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalManager');
  }
  return context;
}

export function ModalManager({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [footer, setFooter] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  const openModal = (modalTitle: string, content: React.ReactNode, modalFooter: string) => {
    setModal(content);
    setTitle(modalTitle);
    setFooter(modalFooter);
    setIsActive(false);

    setTimeout(() => {
      setIsActive(true);
    }, 100);
  };

  const closeModal = () => {
    setModal(null);
    setIsActive(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const modalElement = document.querySelector('.modal-container');
      if (modalElement && !modalElement.contains(e.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const modalContextValue = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
      {modal && (
        <div className={`modal ${isActive ? 'modal-active' : ''}`}>
          <div className={`modal-backdrop ${isActive ? 'active' : ''}`}>
            <div className={`modal-container ${isActive ? 'active' : ''}`}>
              <div className='modal-container-header'>
                <h3 className='modal-container-title'>{title}</h3>
                <button className='modal-close-button' onClick={closeModal}>
                  close
                </button>
              </div>
              <section className='modal-container-body rtf'>{modal}</section>
              <div className='modal-container-footer'>{footer}</div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
