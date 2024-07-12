'use client'

import styles from "./Modal.module.css";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from 'react';

const Modal = ({ isOpen, closeModal, modalTitle, modalContent }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.8 });
    }
  }, [isOpen, controls]);

  const handleCloseModal = () => {
    controls.start({ opacity: 0, scale: 0.8 }).then(() => closeModal());
  };

  return (
    <>
      {isOpen && (
        <motion.div
          className={styles["app-modal-wrapper"]}
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={styles["app-modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["app-modal-header"]}>
              <span>{modalTitle}</span>
              <svg
                width="100%"
                height="100%"
                onClick={handleCloseModal}
                style={{ cursor: 'pointer' }}
              >
                <image width="28" height="28" href="/svg/icons/cross.svg" />
              </svg>
            </div>
            <div className={styles["app-modal-content"]}>
              {modalContent}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Modal;
