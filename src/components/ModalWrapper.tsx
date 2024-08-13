import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface ModalWrapperProps {
    children: React.ReactNode;
    toggleModal: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, toggleModal }) => {
    return (
        <div id="payment-modal" className="modal">
            <div className="modal-content p-3">
                <button onClick={toggleModal} className="btn modal-close"><FontAwesomeIcon icon={faX}/></button>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;