import {useClickOutside} from '@components/navbar/use-click-outside';
import {ReactNode, useRef} from 'react';

export function Modal({
  showsModal = false,
  closeModal,
  icon,
  title,
  description,
  body,
}: {
  showsModal: boolean;
  closeModal: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  body: ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, closeModal);

  return (
    <div
      className={`${
        showsModal ? 'block' : 'hidden'
      } fixed inset-0 z-10 overflow-y-auto`}
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <ModalBackgroundOverlay showsModal={showsModal} />

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`${
            showsModal ? 'inline-block' : 'hidden'
          } px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
          aria-modal="true"
        >
          {/* Modal contents */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto">
              {icon}
            </div>

            <div className="mt-3 text-center sm:mt-5">
              <ModalTitle title={title} />
              <div className="mt-2">
                <ModalDescription description={description} />
              </div>

              <div className="mt-4">{body}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalBackgroundOverlay({showsModal}: {showsModal: boolean}) {
  return (
    <>
      <div
        className={`${
          showsModal ? 'block' : 'hidden'
        } fixed inset-0 transition-opacity`}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      {/* This element is to trick the browser into centering the modal contents. */}
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      />
    </>
  );
}

function ModalTitle({title}: {title: string}) {
  return (
    <h3
      className="text-lg font-medium leading-6 text-gray-900"
      id="modal-headline"
    >
      {title}
    </h3>
  );
}

function ModalDescription({description}: {description: string}) {
  return <p className="text-sm text-gray-500">{description}</p>;
}
