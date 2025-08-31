import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [modalData, setModalData] = useState(null);
    function openModal(content) {
        setModalData(content);
    }
    function closeModal() {
        setModalData(null);
    }
    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <div
                className={
                    'absolute flex top-0 left-0 w-screen items-center justify-center bg-gray-500/60 h-screen ' +
                    (modalData ?? 'hidden')
                }
                onClick={closeModal}
            >
                <div
                    className="bg-white rounded-lg p-4 max-w-52 w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {modalData}
                </div>
            </div>
        </ModalContext.Provider>
    );
};
