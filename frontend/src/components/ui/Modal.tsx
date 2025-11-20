import { createContext, ReactNode, useContext, useRef } from "react";

const ModalContext = createContext<React.RefObject<HTMLDialogElement> | null>(
  null,
);

function Root({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <ModalContext.Provider value={dialogRef}>{children}</ModalContext.Provider>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  const dialogRef = useContext(ModalContext);
  if (dialogRef === null) {
    throw new Error("Modal.Trigger must be used within a Modal.Root component");
  }

  return (
    <button
      type="button"
      className="btn"
      onClick={() => {
        dialogRef.current?.showModal();
      }}
    >
      {children}
    </button>
  );
}

function Content({
  children,
}: {
  children: React.ReactNode | ((closeModal: () => void) => React.ReactNode);
}) {
  const dialogRef = useContext(ModalContext);
  if (dialogRef === null) {
    throw new Error("Modal.Content must be used within a Modal.Root component");
  }
  const closeModal = () => dialogRef.current?.close();

  return (
    <dialog ref={dialogRef} className="modal p-8">
      <div className="modal-box">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        {typeof children === "function" ? children(closeModal) : children}
      </div>
    </dialog>
  );
}

const Modal = { Root, Trigger, Content };

export { Modal };
