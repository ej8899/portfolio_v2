/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, SetStateAction } from 'react';

import './Modal.scss';

// Create a context to manage modals
const ModalContext = createContext();

// Custom hook to access the ModalContext
export function useModal() {
  return useContext(ModalContext);
}

// Modal Manager component
export function ModalManager({ children }) {
  const [modal, setModal] = useState(null);
  const [title, setTitle] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // Function to open a modal
  const openModal = (modaltitle, content: SetStateAction<null>) => {
    setModal(content);
    setTitle(modaltitle);
    setIsActive(false);
    console.log('modalmanager: openmodel()');

    // After a short delay, remove the active class from modal-container to trigger the transition
    setTimeout(() => {
      setIsActive(true);
    }, 100);
  };

  // Function to close the current modal
  const closeModal = () => {
    setModal(null);
    setIsActive(false); // Hide modal and backdrop
  };

  // Event listener to close the modal on Escape key press
  useEffect(() => {
    const handleKeyPress = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
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

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && (
        <div className={`modal ${isActive ? 'modal-active' : ''}`}>
          <div className={`modal-backdrop ${isActive ? 'active' : ''}`}>
            <div className={`modal-container ${isActive ? 'active' : ''}`}>
              <div className='modal-container-header'>
                <h3 className='modal-container-title'>{title}</h3>
                <button className='icon-button' onClick={closeModal}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'
                    />
                  </svg>
                </button>
              </div>
              <section className='modal-container-body rtf'>{modal}</section>
              <footer className='modal-container-footer'>&nbsp;Footer Text</footer>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}