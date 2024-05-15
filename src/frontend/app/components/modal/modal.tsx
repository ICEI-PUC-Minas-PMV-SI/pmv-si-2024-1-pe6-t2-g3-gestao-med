"use client";

import { X } from "@phosphor-icons/react";
import styles from "./page.module.css";

interface IModal {
  isModalOpen: boolean;
  modalTitle: string;
  onCloseModal: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isModalOpen,
  onCloseModal,
  modalTitle,
  children,
}: IModal) {
  const handleCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.overlay} onClick={handleCloseModal}>
          <div className={styles.modal}>
            <div className={styles.modalTitleArea}>
              <h1>{modalTitle}</h1>
              <X
                className={styles.closeButtonIcon}
                size={16}
                onClick={() => onCloseModal()}
              />
            </div>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
