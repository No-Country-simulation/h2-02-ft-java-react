import { useEffect } from 'react';
import { IoIosWarning, IoMdClose } from 'react-icons/io';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="relative flex h-52 w-52 flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>
        <IoIosWarning size={70} color="red" />
        <div
          className="mt-4 text-center text-red-500"
          style={{ fontSize: '16px' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
